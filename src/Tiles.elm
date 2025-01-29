module Tiles exposing (..)

import Dict exposing (Dict)
import Html exposing (Html, img)
import Html.Attributes exposing (src, width)
import Random exposing (Generator)


tileSize : Int
tileSize = 60


tileLibrary : Dict String (Html msg)
tileLibrary =
    [ ( "diagonal-down", img [ src "../tiles/diagonal-down.png", width tileSize ] [] )
    , ( "horizontal", img [ src "../tiles/horizontal.png", width tileSize ] [] )
    , ( "ne-yellow", img [ src "../tiles/ne-yelo.png", width tileSize ] [] )
    , ( "nw-yellow", img [ src "../tiles/nw-yelo.png", width tileSize ] [] )
    , ( "se-pink", img [ src "../tiles/se-pink.png", width tileSize ] [] )
    , ( "sw-pink", img [ src "../tiles/sw-pink.png", width tileSize ] [] )
    , ( "vertical", img [ src "../tiles/vertical.png", width tileSize ] [] )
    , ( "diagonal-up", img [ src "../tiles/diagonal-up.png", width tileSize ] [] )
    , ( "ne-pink", img [ src "../tiles/ne-pink.png", width tileSize ] [] )
    , ( "nw-pink", img [ src "../tiles/nw-pink.png", width tileSize ] [] )
    , ( "pink", img [ src "../tiles/pink.png", width tileSize ] [] )
    , ( "se-yellow", img [ src "../tiles/se-yelo.png", width tileSize ] [] )
    , ( "sw-yellow", img [ src "../tiles/sw-yelo.png", width tileSize ] [] )
    , ( "yellow", img [ src "../tiles/yelo.png", width tileSize ] [] )
    ]
        |> Dict.fromList


randomTiles : Int -> Generator (List (Html msg))
randomTiles count =
    let
        someTile =
            img [ src "../tiles/yelo.png", width tileSize ] []
    in
    case count of
        0 ->
            Random.constant []

        1 ->
            Dict.values tileLibrary
                |> Random.uniform someTile
                |> Random.andThen (List.singleton >> Random.constant)

        x ->
            Random.map2 (++) (randomTiles 1) (randomTiles (x - 1))
