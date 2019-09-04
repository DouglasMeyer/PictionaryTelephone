module DecoderSpec exposing (..)

import Decoder exposing (..)
import Expect
import Json.Decode
import Test exposing (..)
import Types exposing (..)


suite : Test
suite =
    describe "encode / decode"
        [ describe "decodeThread"
            [ test "decodes a Thread for 0 rounds" <|
                \_ ->
                    """{
                        "id": 12,
                        "pairs": [
                        ],
                        "phrase": null
                    }"""
                        |> Json.Decode.decodeString Decoder.decodeThread
                        |> Expect.equal
                            (Ok <|
                                Thread
                                    12
                                    []
                            )
            , test "decodes a Thread for 1 round" <|
                \_ ->
                    """{
                        "id": 12,
                        "pairs": [
                            {
                                "phrase": { "author": "Me", "phrase": "What's up" },
                                "drawing": null
                            }
                        ]
                    }"""
                        |> Json.Decode.decodeString Decoder.decodeThread
                        |> Expect.equal
                            (Ok <|
                                Thread
                                    12
                                    [ ( Just <| Phrase "Me" "What's up"
                                      , Nothing
                                      )
                                    ]
                            )
            , test "decodes a Thread for 2 rounds" <|
                \_ ->
                    """{
                        "id": 12,
                        "pairs": [
                            {
                                "phrase": { "author": "Me", "phrase": "What's up" },
                                "drawing": { "author": "You", "drawing": "base64:blablabla" }
                            }
                        ]
                    }"""
                        |> Json.Decode.decodeString Decoder.decodeThread
                        |> Expect.equal
                            (Ok <|
                                Thread
                                    12
                                    [ ( Just <| Phrase "Me" "What's up"
                                      , Just <| Drawing "You" "base64:blablabla"
                                      )
                                    ]
                            )
            , test "decodes a Thread for 3 rounds" <|
                \_ ->
                    """{
                        "id": 12,
                        "pairs": [
                            {
                                "phrase": { "author": "Me", "phrase": "What's up" },
                                "drawing": { "author": "You", "drawing": "base64:blablabla" }
                            },
                            {
                                "phrase": { "author": "Me", "phrase": "I have no idea what that is" },
                                "drawing": null
                            }
                        ]
                    }"""
                        |> Json.Decode.decodeString Decoder.decodeThread
                        |> Expect.equal
                            (Ok <|
                                Thread
                                    12
                                    [ ( Just <| Phrase "Me" "What's up"
                                      , Just <| Drawing "You" "base64:blablabla"
                                      )
                                    , ( Just <| Phrase "Me" "I have no idea what that is"
                                      , Nothing
                                      )
                                    ]
                            )
            ]
        ]
