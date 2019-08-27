module Main exposing (Model, Msg(..), init, main, update, view)

import Browser
import Html
import Html.Attributes
import Html.Events



-- Model


type Page
    = Start
    | NewGame
    | NewThread
    | Draw
    | Describe


type alias Turn =
    { phrase : String, drawing : Maybe String }


type alias Thread =
    { writer : String, turns : List Turn }


type alias Model =
    { page : Page, name : String, currentThread : Int, threads : List Thread }


init : Model
init =
    { page = Start, name = "", currentThread = 0, threads = [] }



-- Update


type Msg
    = StartNewGame
    | JoinGame
    | SetName String
    | StartGame
    | SetTurnPhrase Int Int String
    | SubmitTurnPhrase Int Int
    | SetTurnDrawing Int Int String
    | SubmitTurnDrawing Int Int


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
            { model
                | page = NewThread
                , currentThread = 0
                , threads =
                    [ Thread model.name
                        [ Turn "" Nothing
                        ]
                    ]
            }

        SetTurnPhrase threadIndex turnIndex phrase ->
            { model
                | threads =
                    updateIndex threadIndex
                        (\thread ->
                            { thread
                                | turns =
                                    updateIndex turnIndex
                                        (\turn ->
                                            { turn | phrase = phrase }
                                        )
                                        thread.turns
                            }
                        )
                        model.threads
            }

        SubmitTurnPhrase threadIndex turnIndex ->
            { model
                | page = Draw
                , currentThread = 0
            }

        SetTurnDrawing threadIndex turnIndex drawing ->
            { model
                | threads =
                    updateIndex threadIndex
                        (\thread ->
                            { thread
                                | turns =
                                    updateIndex turnIndex
                                        (\turn ->
                                            { turn | drawing = Just drawing }
                                        )
                                        thread.turns
                            }
                        )
                        model.threads
            }

        SubmitTurnDrawing threadIndex turnIndex ->
            { model
                | page = Describe
                , currentThread = 0
            }


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
        , columnView
            [ Html.button [ Html.Events.onClick StartNewGame ] [ Html.text "Start New Game" ]
            , Html.button [ Html.Events.onClick JoinGame ] [ Html.text "Join Game" ]
            ]
        ]


newGameView : Model -> Html.Html Msg
newGameView model =
    rowView
        [ Html.label []
            [ Html.text "Your Name"
            , Html.input
                [ model.name |> Html.Attributes.value
                , Html.Events.onInput SetName
                ]
                []
            ]
        , Html.button
            [ Html.Events.onClick StartGame
            , Html.Attributes.disabled <| model.name == ""
            ]
            [ Html.text "Start Game" ]
        ]


newThreadView : Model -> Html.Html Msg
newThreadView model =
    rowView
        [ Html.label [] [ Html.text "Your phrase for the game" ]
        , Html.input [ Html.Events.onInput (SetTurnPhrase 0 0) ] []
        , Html.button [ Html.Events.onClick (SubmitTurnPhrase 0 0) ] [ Html.text "Submit" ]
        ]


newDrawingView : Model -> Html.Html Msg
newDrawingView model =
    let
        lastTurn =
            model.threads
                |> (List.take (model.currentThread + 1) >> List.head)
                |> Maybe.map .turns
                |> Maybe.andThen (List.reverse >> List.head)
    in
    case lastTurn of
        Nothing ->
            Html.code [] [ Html.text "Somehow there aren't any threads or turns" ]

        Just turn ->
            rowView
                [ Html.h1 [] [ Html.text turn.phrase ]
                , Html.img
                    [ Html.Attributes.alt "Draw what it is here"
                    , Html.Attributes.style "height" "80vmin"
                    , Html.Attributes.style "width" "40vmin"
                    , Html.Attributes.style "place-self" "center"
                    , Html.Attributes.style "outline" "2px dashed lightgray"
                    ]
                    []
                , Html.button [ Html.Events.onClick (SubmitTurnDrawing model.currentThread 0) ] [ Html.text "Submit" ]
                ]


newDescribeView : Model -> Html.Html Msg
newDescribeView model =
    let
        threadIndex =
            model.currentThread

        lastTurn =
            model.threads
                |> (List.take (threadIndex + 1) >> List.head)
                |> Maybe.map .turns
                |> Maybe.andThen (List.reverse >> List.head)
    in
    case lastTurn of
        Nothing ->
            Html.code [] [ Html.text "Somehow there aren't any threads or turns" ]

        Just turn ->
            rowView
                [ Html.img
                    [ Html.Attributes.alt "The drawing"
                    , Html.Attributes.style "height" "80vmin"
                    , Html.Attributes.style "width" "40vmin"
                    , Html.Attributes.style "place-self" "center"
                    , Html.Attributes.style "outline" "2px dashed lightgray"
                    ]
                    []
                , Html.input
                    [ Html.Events.onInput (SetTurnPhrase threadIndex 0)
                    , Html.Attributes.placeholder "Describe the drawing"
                    ]
                    []

                , Html.button [ Html.Events.onClick (SubmitTurnPhrase threadIndex 0) ] [ Html.text "Submit" ]
                ]



-- View Helpers


rowView : List (Html.Html Msg) -> Html.Html Msg
rowView =
    Html.div
        [ Html.Attributes.style "display" "grid"
        , Html.Attributes.style "grid-auto-flow" "row"
        , Html.Attributes.style "grid-gap" "1em"
        ]


columnView : List (Html.Html Msg) -> Html.Html Msg
columnView =
    Html.div
        [ Html.Attributes.style "display" "grid"
        , Html.Attributes.style "grid-auto-flow" "column"
        , Html.Attributes.style "grid-gap" "1em"
        ]


main =
    Browser.sandbox { init = init, update = update, view = view }
