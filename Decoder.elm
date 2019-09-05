module Decoder exposing (decodeThread)

import Json.Decode as JD
import Types as T


decodePhrase : JD.Decoder T.Phrase
decodePhrase =
    JD.map2 T.Phrase
        (JD.field "author" JD.string)
        (JD.field "phrase" JD.string)


decodeDrawing : JD.Decoder T.Drawing
decodeDrawing =
    JD.map2 T.Drawing
        (JD.field "author" JD.string)
        (JD.field "drawing" JD.string)


decodePair : JD.Decoder T.Pair
decodePair =
    JD.map2 Tuple.pair
        (JD.maybe (JD.field "phrase" decodePhrase))
        (JD.maybe (JD.field "drawing" decodeDrawing))


decodeThread : JD.Decoder T.Thread
decodeThread =
    JD.map2 T.Thread
        (JD.field "id" JD.int)
        (JD.field "pairs" (JD.list decodePair))
