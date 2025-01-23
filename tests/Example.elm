module Example exposing (..)

import Expect
import Main exposing (Grid, indent)
import Test exposing (..)


suite : Test
suite =
    describe "the rug should lay in the middle of a territory"
        [ test """
            screen  is 40x40
            tile    is 10x10
            grid    is 2x2

            the grid starts after 10px
            """ <|
            \_ ->
                Grid 2 2
                    |> indent { width = 40, height = 40 } 10
                    |> Expect.equal 10
        , test """
            screen  is 40x40
            tile    is 10x10
            grid    is 3x3

            the grid starts after 5px
            """ <|
            \_ ->
                Grid 3 3
                    |> indent { width = 40, height = 40 } 10
                    |> Expect.equal 5
        ]
