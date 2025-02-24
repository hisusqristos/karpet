module Tiles exposing (..)

import Dict exposing (Dict)
import Random exposing (Generator)


tileSize : Int
tileSize =
    60


type alias TilePath =
    String


tileLibrary : Dict String TilePath
tileLibrary =
    [ ( "diagonal-down", "../tiles/diagonal-down.png" )
    , ( "horizontal", "../tiles/horizontal.png" )
    , ( "ne-yellow", "../tiles/ne-yelo.png" )
    , ( "nw-yellow", "../tiles/nw-yelo.png" )
    , ( "se-pink", "../tiles/se-pink.png" )
    , ( "sw-pink", "../tiles/sw-pink.png" )
    , ( "vertical", "../tiles/vertical.png" )
    , ( "diagonal-up", "../tiles/diagonal-up.png" )
    , ( "ne-pink", "../tiles/ne-pink.png" )
    , ( "nw-pink", "../tiles/nw-pink.png" )
    , ( "pink", "../tiles/pink.png" )
    , ( "se-yellow", "../tiles/se-yelo.png" )
    , ( "sw-yellow", "../tiles/sw-yelo.png" )
    , ( "yellow", "../tiles/yelo.png" )
    ]
        |> Dict.fromList


randomTiles : Int -> Generator (List String)
randomTiles count =
    case count of
        0 ->
            Random.constant []

        1 ->
            Dict.values tileLibrary
                |> Random.uniform "../tiles/yelo.png"
                |> Random.andThen (List.singleton >> Random.constant)

        x ->
            Random.map2 (++) (randomTiles 1) (randomTiles (x - 1))
