module Types exposing (Drawing, Model, Page(..), Pair, Phrase, Player, Thread, getCurrent, setRound)


type Page
    = Start
    | NewGame
    | NewThread
    | Draw
    | Describe


type alias Player =
    { index : Int, host : Bool, name : String, peerId : String }


type alias Phrase =
    { author : String, phrase : String }


type alias Drawing =
    { author : String, drawing : String }


type alias Pair =
    ( Maybe Phrase, Maybe Drawing )


type alias Thread =
    { id : Int, pairs : List Pair }


setRound : Int -> Thread -> ( String, String ) -> Thread
setRound round thread ( author, value ) =
    let
        start =
            List.take (round // 2) thread.pairs

        ( pair, end ) =
            let
                tail =
                    List.drop (round // 2) thread.pairs
            in
            case tail of
                [] ->
                    ( ( Nothing, Nothing )
                    , []
                    )

                head :: rest ->
                    ( head, rest )

        updatedPair : Pair
        updatedPair =
            case modBy 2 round of
                0 ->
                    ( Just <| Phrase author value
                    , Nothing
                    )

                _ ->
                    ( Tuple.first pair
                    , Just <| Drawing author value
                    )
    in
    { thread
        | pairs =
            List.concat
                [ start
                , [ updatedPair ]
                , end
                ]
    }


getCurrent : Model -> Result String ( ( Int, String ), Thread )
getCurrent model =
    let
        roundResult : Result String ( Int, String )
        roundResult =
            model.round |> Result.fromMaybe "Could not get round"

        offsetResult : Result String Int
        offsetResult =
            roundResult
                |> Result.map
                    (\( round, _ ) ->
                        modBy
                            (List.length model.players)
                            (round + model.me.index)
                    )

        threadResult : Result String Thread
        threadResult =
            Result.map2 Tuple.pair offsetResult roundResult
                |> Result.andThen
                    (\( offset, round ) ->
                        List.take (offset + 1) model.threads
                            |> List.reverse
                            |> List.head
                            |> Result.fromMaybe ("Could not get the thread " ++ String.fromInt offset)
                    )
    in
    Result.map2 Tuple.pair roundResult threadResult


type alias Model =
    { page : Page
    , url : String
    , error : Maybe String
    , me : Player
    , gameId : String
    , round : Maybe ( Int, String )
    , players : List Player
    , threads : List Thread
    }
