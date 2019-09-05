port module Main exposing (Msg(..), init, main, update, view)

import Array
import Browser
import Decoder
import Html
import Html.Attributes as Attrs
import Html.Events as Events
import Json.Decode
import Json.Encode
import QRCode
import Random
import Random.List
import Types exposing (..)


init : Json.Decode.Value -> ( Model, Cmd Msg )
init json =
    let
        url : String
        url =
            case Json.Decode.decodeValue (Json.Decode.field "url" Json.Decode.string) json of
                Ok u ->
                    u

                _ ->
                    "http://douglas-meyer.name/"

        gameId : String
        gameId =
            case Json.Decode.decodeValue (Json.Decode.field "gameId" Json.Decode.string) json of
                Ok id ->
                    id

                _ ->
                    ""
    in
    ( { page = Start
      , url = url
      , error = Nothing
      , me = Player 0 False "Random Player" ""
      , gameId = gameId
      , round = Nothing
      , players = []
      , threads = []
      }
    , Cmd.none
    )


main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }



-- Update


type Msg
    = StartNewGame
    | SetGameId String
    | JoinGame
    | SetPeerId String
    | SetName String
    | SetPlayer Player
    | SetThread (Result String Thread)
    | SetupGame
    | StartGame (List Player)
    | SetRound String
    | SubmitRound


port connectHost : String -> Cmd msg


port sendPlayer : Json.Encode.Value -> Cmd msg


port sendThread : Json.Encode.Value -> Cmd msg


encodePlayer : Player -> Json.Encode.Value
encodePlayer player =
    Json.Encode.object
        [ ( "index", Json.Encode.int player.index )
        , ( "host", Json.Encode.bool player.host )
        , ( "name", Json.Encode.string player.name )
        , ( "peerId", Json.Encode.string player.peerId )
        ]


encodePhrase : Phrase -> Json.Encode.Value
encodePhrase phrase =
    Json.Encode.object
        [ ( "author", Json.Encode.string phrase.author )
        , ( "phrase", Json.Encode.string phrase.phrase )
        ]


encodeDrawing : Drawing -> Json.Encode.Value
encodeDrawing drawing =
    Json.Encode.object
        [ ( "author", Json.Encode.string drawing.author )
        , ( "drawing", Json.Encode.string drawing.drawing )
        ]


encodeThread : Thread -> Json.Encode.Value
encodeThread thread =
    Json.Encode.object
        [ ( "id", Json.Encode.int thread.id )
        , ( "pairs"
          , thread.pairs
                |> List.map
                    (\( phrase, drawing ) ->
                        Json.Encode.object
                            [ ( "phrase", phrase |> Maybe.map encodePhrase |> Maybe.withDefault Json.Encode.null )
                            , ( "drawing", drawing |> Maybe.map encodeDrawing |> Maybe.withDefault Json.Encode.null )
                            ]
                    )
                |> Array.fromList
                |> Json.Encode.array (\a -> a)
          )
        ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg ({ me } as model) =
    case msg of
        SetPeerId peerId ->
            let
                newMe =
                    { me | peerId = peerId }

                gameId =
                    if model.me.host then
                        peerId

                    else
                        model.gameId
            in
            ( { model | me = newMe, gameId = gameId }
            , newMe |> encodePlayer |> sendPlayer
            )

        SetGameId gameId ->
            ( { model | gameId = gameId }, Cmd.none )

        StartNewGame ->
            let
                newMe =
                    { me | host = True }
            in
            ( { model
                | page = NewGame
                , me = newMe
                , gameId = newMe.peerId
                , players = [ newMe ]
              }
            , Cmd.none
            )

        SetName name ->
            let
                newMe =
                    { me | name = name }
            in
            ( { model
                | me = newMe
                , players =
                    model.players
                        |> List.map
                            (\p ->
                                if p.peerId == me.peerId then
                                    newMe

                                else
                                    p
                            )
              }
            , newMe |> encodePlayer |> sendPlayer
            )

        JoinGame ->
            ( { model
                | me = { me | host = False }
                , page = NewGame
              }
            , connectHost model.gameId
            )

        SetPlayer player ->
            let
                updatedPlayers =
                    model.players
                        |> List.map
                            (\p ->
                                if p.peerId == player.peerId then
                                    player

                                else
                                    p
                            )

                newPlayers =
                    if List.member player updatedPlayers then
                        updatedPlayers

                    else
                        player :: model.players

                newMe =
                    if player.peerId == model.me.peerId then
                        player

                    else
                        model.me
            in
            ( { model | players = newPlayers, me = newMe }
            , if model.me.host then
                newPlayers
                    |> List.map (encodePlayer >> sendPlayer)
                    |> Cmd.batch

              else
                Cmd.none
            )

        SetupGame ->
            let
                playersGen =
                    model.players |> Random.List.shuffle

                threads =
                    List.range 0 ((model.players |> List.length) - 1)
                        |> List.map (\id -> Thread id [])
            in
            ( { model
                | threads = threads
              }
            , Random.generate StartGame playersGen
            )

        StartGame players ->
            let
                newPlayers =
                    players
                        |> List.indexedMap Tuple.pair
                        |> List.map (\( index, player ) -> Player index player.host player.name player.peerId)

                newMe =
                    newPlayers
                        |> List.filter (\p -> p.peerId == model.me.peerId)
                        |> List.head
                        |> Maybe.withDefault model.me

                sendPlayers =
                    newPlayers
                        |> List.map (encodePlayer >> sendPlayer)

                sendThreads =
                    List.map (encodeThread >> sendThread) model.threads
            in
            ( { model
                | page = NewThread
                , round = Just ( 0, "" )
                , me = newMe
                , players = newPlayers
              }
            , (sendPlayers ++ sendThreads) |> Cmd.batch
            )

        SetThread threadResult ->
            case threadResult of
                Result.Err error ->
                    ( { model | error = Just error }, Cmd.none )

                Ok thread ->
                    let
                        threads =
                            model.threads
                                |> List.map
                                    (\t ->
                                        if t.id == thread.id then
                                            thread

                                        else
                                            t
                                    )

                        newThreads =
                            if List.member thread threads then
                                threads

                            else
                                thread :: model.threads

                        cmd =
                            if model.me.host then
                                thread |> encodeThread |> sendThread

                            else
                                Cmd.none
                    in
                    case model.round of
                        Nothing ->
                            ( { model
                                | threads = newThreads
                                , round = Just ( 0, "" )
                                , page = NewThread
                              }
                            , cmd
                            )

                        Just round ->
                            ( { model | threads = newThreads }
                            , cmd
                            )

        SetRound value ->
            ( { model
                | round =
                    Just
                        ( model.round |> Maybe.map Tuple.first |> Maybe.withDefault 0
                        , value
                        )
              }
            , Cmd.none
            )

        SubmitRound ->
            let
                currentResult =
                    getCurrent model

                roundResult : Result String Thread
                roundResult =
                    Result.map
                        (\( round, thread ) ->
                            setRound (Tuple.first round) thread ( model.me.name, Tuple.second round )
                        )
                        currentResult
            in
            case Result.map2 Tuple.pair roundResult currentResult of
                Ok ( thread, ( ( round, _ ), _ ) ) ->
                    ( { model
                        | threads =
                            model.threads
                                |> List.map
                                    (\t ->
                                        if t.id == thread.id then
                                            thread

                                        else
                                            t
                                    )
                        , round =
                            Just ( round + 1, "" )
                        , page =
                            case model.page of
                                Draw ->
                                    Describe

                                _ ->
                                    if round >= ((List.length model.players - 1) // 2 * 2 + 1) then
                                        Review

                                    else
                                        Draw
                      }
                    , thread |> encodeThread |> sendThread
                    )

                Err error ->
                    ( { model | error = Just error }, Cmd.none )


updateIndex : Int -> (a -> a) -> List a -> List a
updateIndex indexToUpdate updateThing things =
    List.indexedMap
        (\index thing ->
            if index == indexToUpdate then
                updateThing thing

            else
                thing
        )
        things



-- Subscriptions


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ setPeerId SetPeerId
        , setPlayer SetPlayer
        , setThread (SetThread << decodeThreadSub)
        ]


decodeThreadSub : Json.Decode.Value -> Result String Thread
decodeThreadSub json =
    case Json.Decode.decodeValue Decoder.decodeThread json of
        Ok thread ->
            Ok thread

        Result.Err error ->
            Result.Err <| Json.Decode.errorToString error


port setPeerId : (String -> msg) -> Sub msg


port setPlayer : (Player -> msg) -> Sub msg


port setThread : (Json.Decode.Value -> msg) -> Sub msg



-- View


view : Model -> Html.Html Msg
view model =
    case model.page of
        Start ->
            startView model

        NewGame ->
            newGameView model

        NewThread ->
            newThreadView model

        Draw ->
            newDrawingView model

        Describe ->
            newDescribeView model

        Review ->
            reviewView model


startView : Model -> Html.Html Msg
startView model =
    rowView
        [ ( "auto", Html.h1 [] [ Html.text "Pictionary Telephone" ] )
        , ( "auto"
          , Html.code
                []
                [ model.error |> Maybe.withDefault "" |> Html.text
                ]
          )
        , ( "auto", Html.button [ Events.onClick StartNewGame ] [ Html.text "Start New Game" ] )
        , ( "auto", Html.div [] [] )
        , ( "auto"
          , Html.input
                [ Attrs.placeholder "host id"
                , model.gameId |> Attrs.value
                , Events.onInput SetGameId
                ]
                []
          )
        , ( "auto"
          , Html.button
                [ Events.onClick JoinGame
                , Attrs.disabled <| model.gameId == ""
                ]
                [ Html.text "Join Game"
                ]
          )
        , ( "1fr", Html.div [] [] )
        ]


newGameView : Model -> Html.Html Msg
newGameView model =
    let
        startButton =
            case model.me.host of
                True ->
                    Html.button
                        [ Events.onClick SetupGame ]
                        [ Html.text "Start Game" ]

                False ->
                    Html.button
                        [ Attrs.disabled True ]
                        [ Html.text "waiting for host to start game" ]

        playerList : List (Html.Html msg)
        playerList =
            model.players
                |> List.reverse
                |> List.map
                    (.name >> Html.text >> List.singleton >> Html.li [])
    in
    rowView
        [ ( "auto", model.error |> Maybe.withDefault "" |> Html.text |> List.singleton |> Html.pre [ Attrs.class "error" ] )
        , ( "1fr"
          , columnView
                [ ( "auto"
                  , Html.p
                        []
                        [ Html.text <| "Join game with id " ++ model.gameId ++ " or scan QR code:"
                        ]
                  )
                , ( "auto"
                  , QRCode.encode (model.url ++ "?gameId=" ++ model.gameId)
                        |> Result.map QRCode.toSvg
                        |> Result.withDefault
                            (Html.text "Error while encoding to QRCode.")
                  )
                ]
          )
        , ( "auto"
          , Html.label []
                [ Html.text "Your Name"
                , Html.input
                    [ model.me.name |> Attrs.value
                    , Events.onInput SetName
                    ]
                    []
                ]
          )
        , ( "1fr", Html.ul [] playerList )
        , ( "auto", startButton )
        ]


newThreadView : Model -> Html.Html Msg
newThreadView model =
    let
        playerOrder : List Player
        playerOrder =
            List.sortBy
                (.index >> (-) model.me.index >> modBy (List.length model.players))
                model.players
    in
    rowView
        [ ( "auto", Html.code [] [ model.error |> Maybe.withDefault "" |> Html.text ] )
        , ( "auto", Html.label [] [ Html.text "Your phrase for the game" ] )
        , ( "auto", Html.input [ Events.onInput SetRound ] [] )
        , ( "auto", Html.button [ Events.onClick SubmitRound ] [ Html.text "Submit" ] )
        , ( "1fr"
          , Html.p []
                [ playerOrder
                    |> List.map .name
                    |> List.reverse
                    |> List.intersperse " → "
                    |> List.foldl (++) ""
                    |> Html.text
                ]
          )
        ]


newDrawingView : Model -> Html.Html Msg
newDrawingView model =
    let
        currentResult : Result String ( ( Int, String ), Thread )
        currentResult =
            getCurrent model

        phraseResult : Result String String
        phraseResult =
            currentResult
                |> Result.andThen
                    (\( ( round, _ ), thread ) ->
                        thread.pairs
                            |> List.take
                                ((round // 2)
                                    + 1
                                )
                            |> List.reverse
                            |> List.head
                            |> Maybe.andThen Tuple.first
                            |> Maybe.map .phrase
                            |> Result.fromMaybe
                                "waiting on other players"
                    )
    in
    case currentResult of
        Err error ->
            rowView [ ( "auto", Html.p [] [ Html.text error ] ) ]

        Ok ( ( round, _ ), thread ) ->
            let
                playerOrder : List Player
                playerOrder =
                    List.sortBy
                        (.index >> (-) model.me.index >> (+) round >> modBy (List.length model.players))
                        model.players
            in
            case phraseResult of
                Err error ->
                    rowView
                        [ ( "auto", Html.code [] [ model.error |> Maybe.withDefault "" |> Html.text ] )
                        , ( "auto", Html.p [] [ Html.text error ] )
                        , ( "auto"
                          , Html.p []
                                [ playerOrder
                                    |> List.map .name
                                    |> List.reverse
                                    |> List.intersperse " → "
                                    |> List.foldl (++) ""
                                    |> Html.text
                                ]
                          )
                        ]

                Ok phrase ->
                    rowView
                        [ ( "auto", Html.code [] [ model.error |> Maybe.withDefault "" |> Html.text ] )
                        , ( "auto"
                          , Html.h1 []
                                [ Html.text phrase
                                ]
                          )
                        , ( "1fr"
                          , Html.node "drawing-canvas"
                                [ Attrs.alt "Draw what it is here"
                                , Attrs.style "height" "calc(100vh - 16rem)"
                                , Attrs.style "width" "calc((100vh - 16rem)/2)"
                                , Attrs.style "place-self" "center"
                                , Attrs.style "outline" "2px dashed lightgray"
                                , Events.on "drawingChanged" <| Json.Decode.map SetRound <| Json.Decode.at [ "target", "drawing" ] <| Json.Decode.string
                                ]
                                []
                          )
                        , ( "auto", Html.button [ Events.onClick SubmitRound ] [ Html.text "Submit" ] )
                        , ( "auto"
                          , Html.p []
                                [ playerOrder
                                    |> List.map .name
                                    |> List.reverse
                                    |> List.intersperse " → "
                                    |> List.foldl (++) ""
                                    |> Html.text
                                ]
                          )
                        ]


newDescribeView : Model -> Html.Html Msg
newDescribeView model =
    let
        currentResult : Result String ( ( Int, String ), Thread )
        currentResult =
            getCurrent model

        drawingResult : Result String String
        drawingResult =
            currentResult
                |> Result.andThen
                    (\( ( round, _ ), thread ) ->
                        thread.pairs
                            |> List.take
                                ((round // 2)
                                    + 1
                                )
                            |> List.reverse
                            |> List.head
                            |> Maybe.andThen Tuple.second
                            |> Maybe.map .drawing
                            |> Result.fromMaybe
                                "waiting on other players"
                    )
    in
    case currentResult of
        Err error ->
            rowView [ ( "auto", Html.p [] [ Html.text error ] ) ]

        Ok ( ( round, _ ), thread ) ->
            let
                playerOrder : List Player
                playerOrder =
                    List.sortBy
                        (.index >> (-) model.me.index >> (+) round >> modBy (List.length model.players))
                        model.players
            in
            case drawingResult of
                Err error ->
                    rowView
                        [ ( "auto", Html.code [] [ model.error |> Maybe.withDefault "" |> Html.text ] )
                        , ( "auto", Html.p [] [ Html.text error ] )
                        , ( "auto"
                          , Html.p []
                                [ playerOrder
                                    |> List.map .name
                                    |> List.reverse
                                    |> List.intersperse " → "
                                    |> List.foldl (++) ""
                                    |> Html.text
                                ]
                          )
                        ]

                Ok drawing ->
                    rowView
                        [ ( "auto", Html.code [] [ model.error |> Maybe.withDefault "" |> Html.text ] )
                        , ( "1fr"
                          , Html.div
                                [ Attrs.style "background-image" <| "url(" ++ drawing ++ ")"
                                , Attrs.style "background-size" "contain"
                                , Attrs.style "background-position" "center"
                                , Attrs.style "background-repeat" "no-repeat"
                                ]
                                []
                          )
                        , ( "auto"
                          , Html.input
                                [ Events.onInput SetRound
                                , Attrs.placeholder "Describe the drawing"
                                ]
                                []
                          )
                        , ( "auto", Html.button [ Events.onClick SubmitRound ] [ Html.text "Submit" ] )
                        ]


reviewView : Model -> Html.Html Msg
reviewView model =
    model.threads
        |> List.concatMap reviewThreadView
        |> Html.div []


reviewThreadView : Thread -> List (Html.Html Msg)
reviewThreadView thread =
    thread.pairs
        |> List.concatMap
            (\( phrase, drawing ) ->
                let
                    phraseEls =
                        [ Html.p []
                            [ phrase |> Maybe.map .author |> Maybe.withDefault "" |> (\t -> t ++ ":") |> Html.text
                            ]
                        , Html.p [ Attrs.style "text-align" "center" ]
                            [ phrase |> Maybe.map .phrase |> Maybe.withDefault "" |> Html.text
                            ]
                        ]
                in
                case drawing of
                    Nothing ->
                        phraseEls

                    Just draw ->
                        (++) phraseEls
                            [ Html.p []
                                [ drawing |> Maybe.map .author |> Maybe.withDefault "" |> (\t -> t ++ ":") |> Html.text
                                ]
                            , Html.div
                                [ Attrs.style "background-image" <| "url(" ++ (drawing |> Maybe.map .drawing |> Maybe.withDefault "") ++ ")"
                                , Attrs.style "background-size" "contain"
                                , Attrs.style "background-position" "center"
                                , Attrs.style "background-repeat" "no-repeat"
                                , Attrs.style "height" "100vw"
                                ]
                                []
                            ]
            )
        |> (\l -> l ++ [ Html.hr [] [] ])



-- View Helpers


rowView : List ( String, Html.Html Msg ) -> Html.Html Msg
rowView rows =
    List.map Tuple.second rows
        |> Html.div
            [ Attrs.style "display" "grid"
            , Attrs.style "grid-auto-flow" "row"
            , Attrs.style "grid-template-rows" <| String.join " " <| List.map Tuple.first rows
            , Attrs.style "grid-gap" "1em"
            , Attrs.style "height" "100%"
            ]


columnView : List ( String, Html.Html Msg ) -> Html.Html Msg
columnView cols =
    List.map Tuple.second cols
        |> Html.div
            [ Attrs.style "display" "grid"
            , Attrs.style "grid-auto-flow" "column"
            , Attrs.style "grid-template-columns" <| String.join " " <| List.map Tuple.first cols
            , Attrs.style "grid-gap" "1em"
            , Attrs.style "height" "100%"
            ]
