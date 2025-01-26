module Grid exposing (..)

import Expect
import Main exposing (Grid, locations)
import Test exposing (..)


suite : Test
suite =
    describe "About the grid, locations, cells, etc "
        [ test "2x2 grid -> (1, 1), (1, 2), (2, 1), (2, 2)" <|
            \_ ->
                Grid 2 2
                    |> locations
                    |> Expect.equal [ ( 1, 1 ), ( 1, 2 ), ( 2, 1 ), ( 2, 2 ) ]
        , test "2x3 grid -> one more row" <|
            \_ ->
                Grid 2 3
                    |> locations
                    |> Expect.equal [ ( 1, 1 ), ( 1, 2 ), ( 2, 1 ), ( 2, 2 ), ( 3, 1 ), ( 3, 2 ) ]
        ]
