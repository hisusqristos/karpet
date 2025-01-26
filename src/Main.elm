module Main exposing (..)

import Browser
import Dict exposing (Dict)
import Html exposing (Html, div, img)
import Html.Attributes exposing (src, style, width)
import Random exposing (Generator)


type alias Model =
    { screen : ScreenSize }


type alias Flags =
    ScreenSize


type alias ScreenSize =
    { width : Float, height : Float }


init : Flags -> ( Model, Cmd Msg )
init flags =
    ( { screen = flags }, Cmd.none )


type Msg
    = Placid


tileLibrary : Dict String (Html Msg)
tileLibrary =
    [ ( "diagonal-down", img [ src "../tiles/diagonal-down.png", width 60 ] [] )
    , ( "horizontal", img [ src "../tiles/horizontal.png", width 60 ] [] )
    , ( "ne-yellow", img [ src "../tiles/ne-yelo.png", width 60 ] [] )
    , ( "nw-yellow", img [ src "../tiles/nw-yelo.png", width 60 ] [] )
    , ( "se-pink", img [ src "../tiles/se-pink.png", width 60 ] [] )
    , ( "sw-pink", img [ src "../tiles/sw-pink.png", width 60 ] [] )
    , ( "vertical", img [ src "../tiles/vertical.png", width 60 ] [] )
    , ( "diagonal-up", img [ src "../tiles/diagonal-up.png", width 60 ] [] )
    , ( "ne-pink", img [ src "../tiles/ne-pink.png", width 60 ] [] )
    , ( "nw-pink", img [ src "../tiles/nw-pink.png", width 60 ] [] )
    , ( "pink", img [ src "../tiles/pink.png", width 60 ] [] )
    , ( "se-yellow", img [ src "../tiles/se-yelo.png", width 60 ] [] )
    , ( "sw-yellow", img [ src "../tiles/sw-yelo.png", width 60 ] [] )
    , ( "yellow", img [ src "../tiles/yelo.png", width 60 ] [] )
    ]
        |> Dict.fromList


indent : ScreenSize -> Float -> Grid -> Float
indent { width } tileSize { cols } =
    (width - tileSize * toFloat cols) / 2


view : Model -> Html Msg
view { screen } =
    let
        dimensions =
            { cols = 30, rows = 8 }

        rug =
            grid dimensions tilesAnlurj

        oneFingerSpace =
            Debug.toString (indent screen 60 dimensions) ++ "px"
    in
    div [ style "margin-top" "200px", style "margin-left" oneFingerSpace ] [ rug ]


tilesAnlurj : Dict Location (Html msg)
tilesAnlurj =
    Dict.fromList [ ( ( 2, 2 ), img [ src "../tiles/horizontal.png", width 60 ] [] ), ( ( 1, 2 ), img [ src "../tiles/horizontal.png", width 60 ] [] ) ]


tiles : Grid -> Dict Location (Generator (Html Msg))
tiles rug =
    let
        randomTiles : List (Generator (Html msg))
        randomTiles =
            Debug.todo "all locations in grid"

        coordinates =
            locations rug
    in
    List.map2 Tuple.pair coordinates randomTiles |> Dict.fromList


randomTile : Generator (Html Msg)
randomTile =
    let
        rugParts =
            tileLibrary |> Dict.values
    in
    Random.uniform (img [ src "../tiles/yelo.png", width 60 ] []) rugParts


main : Program Flags Model Msg
main =
    Browser.element { init = init, view = view, update = update, subscriptions = \_ -> Sub.none }


update : Msg -> Model -> ( Model, Cmd Msg )
update _ model =
    ( model, Cmd.none )


type alias Grid =
    { cols : Int, rows : Int }


type alias Location =
    ( Int, Int )


grid : Grid -> Dict Location (Html msg) -> Html msg
grid size tileMap =
    let
        cellsForRow : Int -> List ( Int, Int )
        cellsForRow row =
            List.range 1 size.cols |> List.map (\column -> ( column, row ))

        gridByRows : List (List ( Int, Int ))
        gridByRows =
            List.range 1 size.rows |> List.map cellsForRow

        tileOn xy =
            tileMap
                |> Dict.get xy
                |> Maybe.withDefault (img [ src "../tiles/vertical.png", width 60 ] [])

        markupForRow : List Location -> Html msg
        markupForRow =
            List.map (tileOn >> cell)
                >> div [ style "display" "flex" ]
    in
    div [ style "display" "inline-block" ]
        (gridByRows |> List.map markupForRow)


cell : Html msg -> Html msg
cell content =
    div
        [ style "width" "60px"
        , style "height" "60px"
        ]
        [ content ]


locations : Grid -> List Location
locations { cols, rows } =
    let
        columns =
            List.range 1 cols

        eachRow =
            List.range 1 rows
    in
    eachRow
        |> List.foldl
            (\currentRow alreadyPaired -> columns |> List.map (Tuple.pair currentRow) |> (++) alreadyPaired)
            []
