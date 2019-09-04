module TypesSpec exposing (..)

import Decoder exposing (..)
import Expect
import Json.Decode
import Test exposing (..)
import Types exposing (..)


suite : Test
suite =
    describe "types"
        [ describe "setRound"
            [ test "sets first Phrase" <|
                \_ ->
                    setRound
                        0
                        (Thread
                            12
                            []
                        )
                        ( "The Author", "The Phrase" )
                        |> Expect.equal
                            (Thread
                                12
                                [ ( Just <| Phrase "The Author" "The Phrase"
                                  , Nothing
                                  )
                                ]
                            )
            , test "sets first Drawing" <|
                \_ ->
                    setRound
                        1
                        (Thread
                            12
                            [ ( Just <| Phrase "The Author" "The Phrase"
                              , Nothing
                              )
                            ]
                        )
                        ( "The other Author", "The Drawing" )
                        |> Expect.equal
                            (Thread
                                12
                                [ ( Just <| Phrase "The Author" "The Phrase"
                                  , Just <| Drawing "The other Author" "The Drawing"
                                  )
                                ]
                            )
            ]
        ]
