module Symmetry exposing (..)

import Expect
import Main exposing (Grid, scaleSettings, symmetricalCells)
import Test exposing (..)


suite : Test
suite =
    describe "points symmetric to the given coordinate with regard to central symmetry"
        [ test "no axis reflects the point itself" <|
            \_ ->
                ( 1, 1 )
                    |> symmetricalCells (Grid 1 1)
                    |> Expect.equal ( [ ( 1, 1 ) ], [] )
        , test "reflection through one axis gives two points" <|
            \_ ->
                ( 1, 1 )
                    |> symmetricalCells (Grid 1 2)
                    |> Expect.equal ( [ ( 1, 1 ), ( 1, 2 ) ], [] )
        , test "while two axes reflect four points" <|
            \_ ->
                ( 1, 1 )
                    |> symmetricalCells (Grid 2 2)
                    |> Expect.equal ( [ ( 1, 1 ), ( 1, 2 ), ( 2, 1 ), ( 2, 2 ) ], [] )
        , test "the reflection of the points on the symmetry axes are the point themselves" <|
            \_ ->
                ( 2, 1 )
                    |> symmetricalCells (Grid 3 3)
                    |> Expect.equal
                        ( [ ( 2, 1 ), ( 2, 3 ) ]
                        , [ ( 1, 1 ), ( 1, 2 ), ( 1, 3 ), ( 2, 2 ), ( 3, 1 ), ( 3, 2 ), ( 3, 3 ) ]
                        )
        , describe "symmetricCells - universal reflection"
            [ test "point in top-left (1,1) of 3x3 grid" <|
                \_ ->
                    ( 1, 1 )
                        |> symmetricalCells (Grid 3 3)
                        |> Expect.equal ( [ ( 1, 1 ), ( 1, 3 ), ( 3, 1 ), ( 3, 3 ) ], [ ( 1, 2 ), ( 2, 1 ), ( 2, 2 ), ( 2, 3 ), ( 3, 2 ) ] )
            , test "point in top-right (3,1) of 3x3 grid" <|
                \_ ->
                    ( 3, 1 )
                        |> symmetricalCells (Grid 3 3)
                        |> Expect.equal ( [ ( 1, 1 ), ( 1, 3 ), ( 3, 1 ), ( 3, 3 ) ], [ ( 1, 2 ), ( 2, 1 ), ( 2, 2 ), ( 2, 3 ), ( 3, 2 ) ] )
            , test "point in bottom-left (1,3) of 3x3 grid" <|
                \_ ->
                    ( 1, 3 )
                        |> symmetricalCells (Grid 3 3)
                        |> Expect.equal ( [ ( 1, 1 ), ( 1, 3 ), ( 3, 1 ), ( 3, 3 ) ], [ ( 1, 2 ), ( 2, 1 ), ( 2, 2 ), ( 2, 3 ), ( 3, 2 ) ] )
            , test "point in bottom-right (3,3) of 3x3 grid" <|
                \_ ->
                    ( 3, 3 )
                        |> symmetricalCells (Grid 3 3)
                        |> Expect.equal ( [ ( 3, 3 ), ( 3, 1 ), ( 1, 3 ), ( 1, 1 ) ] |> List.sort, [ ( 1, 2 ), ( 2, 1 ), ( 2, 2 ), ( 2, 3 ), ( 3, 2 ) ] )
            , test "point on center axis (2,1) of 3x3 grid" <|
                \_ ->
                    ( 2, 1 )
                        |> symmetricalCells (Grid 3 3)
                        |> Expect.equal ( [ ( 2, 1 ), ( 2, 3 ) ], [ ( 1, 1 ), ( 1, 2 ), ( 1, 3 ), ( 2, 2 ), ( 3, 1 ), ( 3, 2 ), ( 3, 3 ) ] )
            , test "point in the exact center (2,2) of 3x3 grid" <|
                \_ ->
                    ( 2, 2 )
                        |> symmetricalCells (Grid 3 3)
                        |> Expect.equal
                            ( [ ( 2, 2 ) ]
                            , [ ( 1, 1 )
                              , ( 1, 2 )
                              , ( 1, 3 )
                              , ( 2, 1 )
                              , ( 2, 3 )
                              , ( 3, 1 )
                              , ( 3, 2 )
                              , ( 3, 3 )
                              ]
                            )
            , test "point in 4x4 grid, not touching symmetry axes" <|
                \_ ->
                    ( 2, 3 )
                        |> symmetricalCells (Grid 4 4)
                        |> Expect.equal
                            ( [ ( 2, 2 ), ( 2, 3 ), ( 3, 2 ), ( 3, 3 ) ]
                            , [ ( 1, 1 )
                              , ( 1, 2 )
                              , ( 1, 3 )
                              , ( 1, 4 )
                              , ( 2, 1 )
                              , ( 2, 4 )
                              , ( 3, 1 )
                              , ( 3, 4 )
                              , ( 4, 1 )
                              , ( 4, 2 )
                              , ( 4, 3 )
                              , ( 4, 4 )
                              ]
                            )
            ]
        ]


suite2 : Test
suite2 =
    describe "tile rotation for symmetry based on the rug quarter they are in"
        [ test "tiles in the up-left quarter should not be flipped" <|
            \_ ->
                ( 1, 1 )
                    |> scaleSettings { cols = 2, rows = 2 }
                    |> Expect.equal "scale(1,1)"
        , test "tiles in the up-right quarter should be flipped horizontally" <|
            \_ ->
                ( 3, 1 )
                    |> scaleSettings { cols = 3, rows = 3 }
                    |> Expect.equal "scale(-1,1)"
        , test "tiles in the bottom-left quarter should be rotated vertically" <|
            \_ ->
                ( 1, 3 )
                    |> scaleSettings { cols = 4, rows = 4 }
                    |> Expect.equal "scale(1,-1)"
        , test "tiles in the bottom-right quarter should be rotated both vertically and horizontally" <|
            \_ ->
                ( 4, 4 )
                    |> scaleSettings { cols = 4, rows = 4 }
                    |> Expect.equal "scale(-1,-1)"
        , test
            """
            Tiles in the left X axis should not be flipped
            Tiles in the right X axis should be flipped horizontally.
            Tiles in the upper Y axis should not be flipped.
            Tiles in the lower Y axis should be flipped vertically.
            """
          <|
            \_ ->
                [ ( 2, 3 )
                , ( 4, 3 )
                , ( 3, 2 )
                , ( 3, 4 )
                ]
                    |> List.map (scaleSettings { cols = 5, rows = 5 })
                    |> Expect.equalLists
                        [ "scale(1,1)"
                        , "scale(-1,1)"
                        , "scale(1,1)"
                        , "scale(1,-1)"
                        ]
        , test "the middle queen tile deigns not to flip, duh." <|
            \_ ->
                ( 3, 3 )
                    |> scaleSettings { cols = 5, rows = 5 }
                    |> Expect.equal "scale(1,1)"
        ]
