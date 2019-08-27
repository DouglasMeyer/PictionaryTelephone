module Main exposing (Model, Msg(..), init, main, update, view)

import Browser
import Html
import Html.Attributes as Attrs
import Html.Events as Events



-- Model


type Page
    = Start
    | NewGame
    | NewThread
    | Draw
    | Describe


type alias Phrase =
    { author : String, phrase : String }


type alias Drawing =
    { author : String, drawing : String }


type alias Pair =
    ( Phrase, Drawing )


type Thread
    = CompleteThread (List Pair) Phrase
    | IncompleteThread (List Pair)


addPhrase : Phrase -> Thread -> Result String Thread
addPhrase phrase thread =
    case thread of
        IncompleteThread pairs ->
            Ok <| CompleteThread pairs phrase

        CompleteThread _ _ ->
            Result.Err "Can not add a Phrase to a Complete Thread"


addDrawing : Drawing -> Thread -> Result String Thread
addDrawing drawing thread =
    case thread of
        CompleteThread pairs phrase ->
            Ok <| IncompleteThread <| pairs ++ [ ( phrase, drawing ) ]

        IncompleteThread _ ->
            Result.Err "Can not add a Drawing to a Incomplete Thread"


type alias Model =
    { page : Page, error : Maybe String, name : String, currentThread : Int, threads : List Thread }


init : Model
init =
    { page = Start, error = Nothing, name = "", currentThread = 0, threads = [] }



-- Update


type Msg
    = StartNewGame
    | JoinGame
    | SetName String
    | StartGame
    | SetPhrase String
    | SubmitPhrase
    | SetDrawing String
    | SubmitDrawing


update : Msg -> Model -> Model
update msg model =
    case msg of
        StartNewGame ->
            { model | page = NewGame }

        SetName name ->
            { model | name = name }

        JoinGame ->
            model

        StartGame ->
            let
                threadResult =
                    addPhrase (Phrase model.name "") (IncompleteThread [])
            in
            case threadResult of
                Ok thread ->
                    { model
                        | page = NewThread
                        , currentThread = 0
                        , threads =
                            [ thread ]
                    }

                Result.Err error ->
                    { model | page = Start, error = Just error }

        SetPhrase newPhrase ->
            { model
                | threads =
                    updateIndex model.currentThread
                        (\oldThread ->
                            case oldThread of
                                CompleteThread thread phrase ->
                                    CompleteThread thread { phrase | phrase = newPhrase }

                                IncompleteThread _ ->
                                    oldThread
                        )
                        model.threads
            }

        SubmitPhrase ->
            let
                threadIndex =
                    model.currentThread

                maybeThread : Maybe Thread
                maybeThread =
                    model.threads |> List.drop threadIndex |> List.reverse |> List.head

                newThreadResult =
                    maybeThread
                        |> Result.fromMaybe ("Can't find Thread id " ++ String.fromInt threadIndex)
                        |> Result.andThen (addDrawing (Drawing "other" ""))
            in
            case newThreadResult of
                Ok newThread ->
                    { model
                        | page = Draw
                        , currentThread = threadIndex
                        , threads = updateIndex threadIndex (\_ -> newThread) model.threads
                    }

                Result.Err error ->
                    { model | page = Start, error = Just error }

        SetDrawing newDrawing ->
            { model
                | threads =
                    updateIndex model.currentThread
                        (\oldThread ->
                            case oldThread of
                                IncompleteThread pairs ->
                                    IncompleteThread <| updateIndex (List.length pairs - 1) (\( phrase, drawing ) -> ( phrase, Drawing model.name newDrawing )) pairs

                                CompleteThread _ _ ->
                                    oldThread
                        )
                        model.threads
            }

        SubmitDrawing ->
            let
                threadIndex =
                    model.currentThread

                maybeThread : Maybe Thread
                maybeThread =
                    model.threads |> List.drop threadIndex |> List.reverse |> List.head

                newThreadResult =
                    maybeThread
                        |> Result.fromMaybe ("Can't find Thread id " ++ String.fromInt threadIndex)
                        |> Result.andThen (addPhrase (Phrase model.name ""))
            in
            case newThreadResult of
                Ok newThread ->
                    { model
                        | page = Describe
                        , currentThread = threadIndex
                        , threads = updateIndex threadIndex (\_ -> newThread) model.threads
                    }

                Result.Err error ->
                    { model | page = Start, error = Just error }


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


startView : Model -> Html.Html Msg
startView model =
    rowView
        [ Html.h1 [] [ Html.text "Pictionary Telephone" ]
        , Html.code
            []
            [ model.error |> Maybe.withDefault "" |> Html.text
            ]
        , columnView
            [ Html.button [ Events.onClick StartNewGame ] [ Html.text "Start New Game" ]
            , Html.button [ Events.onClick JoinGame ] [ Html.text "Join Game" ]
            ]
        ]


newGameView : Model -> Html.Html Msg
newGameView model =
    rowView
        [ Html.label []
            [ Html.text "Your Name"
            , Html.input
                [ model.name |> Attrs.value
                , Events.onInput SetName
                ]
                []
            ]
        , Html.button
            [ Events.onClick StartGame
            , Attrs.disabled <| model.name == ""
            ]
            [ Html.text "Start Game" ]
        ]


newThreadView : Model -> Html.Html Msg
newThreadView model =
    rowView
        [ Html.label [] [ Html.text "Your phrase for the game" ]
        , Html.input [ Events.onInput SetPhrase ] []
        , Html.button [ Events.onClick SubmitPhrase ] [ Html.text "Submit" ]
        ]


newDrawingView : Model -> Html.Html Msg
newDrawingView model =
    let
        threadIndex =
            model.currentThread

        maybeLastThread : Maybe Thread
        maybeLastThread =
            model.threads
                |> (List.take (threadIndex + 1) >> List.head)
    in
    case maybeLastThread of
        Just (IncompleteThread pairs) ->
            rowView
                [ Html.h1
                    []
                    [ pairs
                        |> List.reverse
                        |> List.head
                        |> Maybe.andThen (Tuple.first >> Just)
                        |> Maybe.map .phrase
                        |> Maybe.withDefault ""
                        |> Html.text
                    ]
                , Html.img
                    [ Attrs.alt "Draw what it is here"
                    , Attrs.style "height" "80vmin"
                    , Attrs.style "width" "40vmin"
                    , Attrs.style "place-self" "center"
                    , Attrs.style "outline" "2px dashed lightgray"
                    ]
                    []
                , Html.button [ Events.onClick SubmitDrawing ] [ Html.text "Submit" ]
                ]

        Just _ ->
            Html.code [] [ Html.text "Trying to update a Complete Thread" ]

        Nothing ->
            Html.code [] [ "Can not get thread " ++ (threadIndex |> String.fromInt) |> Html.text ]


newDescribeView : Model -> Html.Html Msg
newDescribeView model =
    let
        threadIndex =
            model.currentThread

        maybeLastThread : Maybe Thread
        maybeLastThread =
            model.threads
                |> (List.take (threadIndex + 1) >> List.head)
    in
    case maybeLastThread of
        Just (CompleteThread pairs phrase) ->
            rowView
                [ Html.img
                    [ Attrs.alt "The drawing"
                    , Attrs.style "height" "80vmin"
                    , Attrs.style "width" "40vmin"
                    , Attrs.style "place-self" "center"
                    , Attrs.style "outline" "2px dashed lightgray"
                    ]
                    []
                , Html.input
                    [ Events.onInput SetPhrase
                    , Attrs.placeholder "Describe the drawing"
                    ]
                    []
                , Html.button [ Events.onClick SubmitPhrase ] [ Html.text "Submit" ]
                ]

        Just _ ->
            Html.code [] [ Html.text "Trying to update a Incomplete Thread" ]

        Nothing ->
            Html.code [] [ "Can not get thread" ++ (threadIndex |> String.fromInt) |> Html.text ]



-- View Helpers


rowView : List (Html.Html Msg) -> Html.Html Msg
rowView =
    Html.div
        [ Attrs.style "display" "grid"
        , Attrs.style "grid-auto-flow" "row"
        , Attrs.style "grid-gap" "1em"
        ]


columnView : List (Html.Html Msg) -> Html.Html Msg
columnView =
    Html.div
        [ Attrs.style "display" "grid"
        , Attrs.style "grid-auto-flow" "column"
        , Attrs.style "grid-gap" "1em"
        ]


main =
    Browser.sandbox { init = init, update = update, view = view }
