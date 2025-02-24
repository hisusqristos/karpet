module Main exposing (..)

import Browser
import Dict exposing (Dict)
import Html exposing (Html, button, div, img, text)
import Html.Attributes exposing (src, style, width)
import Html.Events exposing (onClick)
import Random exposing (Generator)
import Set
import Tiles exposing (tileLibrary, tileSize)



-- MAIN


main : Program Flags Model Msg
main =
    Browser.element { init = init, view = view, update = update, subscriptions = \_ -> Sub.none }



-- MODEL


type alias Model =
    { screen : ScreenSize, radar : Dict Location (Html Msg), dimensions : Grid }


init : Flags -> ( Model, Cmd Msg )
init flags =
    ( { screen = flags, radar = Dict.empty, dimensions = { cols = 10, rows = 6 } }, Cmd.none )


type alias Grid =
    { cols : Int, rows : Int }


type alias Location =
    ( Int, Int )


type alias ScreenSize =
    { width : Float, height : Float }


type alias Flags =
    ScreenSize


type alias TileMap =
    Dict Location (Html Msg)



-- RUG RELATED


alternativeRadar : List Location -> Grid -> Generator (List ( Location, Html Msg ))
alternativeRadar coordinates rug =
    List.foldl
        (\x acc ->
            let
                ( reflectionCells, locationsLeft ) =
                    symmetricalCells rug x
            in
            Random.map2 (++) (tileUp rug reflectionCells) acc
        )
        (Random.constant [])
        coordinates

-- Recursively generate the rest


tileUp : Grid -> List Location -> Generator (List ( Location, Html Msg ))
tileUp layout cells =
    let
        someTiles : Generator (List String)
        someTiles =
            Dict.values tileLibrary
                |> Random.uniform "../tiles/yelo.png"
                |> Random.map (List.repeat 4)
    in
    Random.map2 (List.map2 Tuple.pair) (Random.constant cells) someTiles
        |> Random.map (List.map (assignRotation layout))



-- ste mi te assignRotation


grid : Grid -> TileMap -> Html Msg
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
                |> Maybe.withDefault (img [ style "transform" "rotate(90deg)", src "../tiles/vertical.png", width tileSize ] [])

        markupForRow : List Location -> Html Msg
        markupForRow =
            List.map (tileOn >> cell)
                >> div [ style "display" "flex" ]
    in
    div [ style "display" "inline-block" ]
        (gridByRows |> List.map markupForRow)


locations : Grid -> List Location
locations { cols, rows } =
    let
        columns =
            List.range 1 cols

        eachRow =
            List.range 1 rows

        pairColsRows col alreadyPaired =
            eachRow
                |> List.map (Tuple.pair col)
                |> (++) alreadyPaired
    in
    columns
        |> List.foldl pairColsRows []


symmetricalCells : Grid -> Location -> ( List Location, List Location )
symmetricalCells ({ cols, rows } as layout) ( abs, ord ) =
    let
        reflect limit point =
            if point >= ceiling (toFloat limit / 2) then
                1 + (limit - point)

            else
                point

        ( x, y ) =
            ( abs, ord )
                |> Tuple.mapBoth (reflect cols) (reflect rows)

        cells =
            (Set.toList << Set.fromList) <|
                [ ( x, y )
                , ( cols - (x - 1), y )
                , ( x, rows - (y - 1) )
                , ( cols - (x - 1), rows - (y - 1) )
                ]

        coordinates =
            locations layout
    in
    coordinates
        |> List.partition (\a -> List.member a cells)


assignRotation : Grid -> ( Location, String ) -> ( Location, Html Msg )
assignRotation layout ( location, tilePath ) =
    img [ style "transform" (scaleSettings layout location), src tilePath, width tileSize ] []
        |> Tuple.pair location


scaleSettings : Grid -> Location -> String
scaleSettings { cols, rows } location =
    let
        flip limit point =
            if point > ceiling (toFloat limit / 2) then
                -1

            else
                1
    in
    location
        |> Tuple.mapBoth (flip cols) (flip rows)
        |> (Debug.toString >> (++) "scale")



-- UPDATE


type Msg
    = NewRug TileMap
    | MixTiles


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    let
        asd =
            alternativeRadar (locations model.dimensions) model.dimensions |> Random.map Dict.fromList
    in
    case msg of
        MixTiles ->
            ( model, Random.generate NewRug asd )

        --(randomRadar model.dimensions) )
        NewRug newRug ->
            ( { model | radar = newRug }, Cmd.none )



-- VIEW


view : Model -> Html Msg
view { screen, radar, dimensions } =
    let
        rug =
            grid dimensions radar

        oneFingerSpace =
            Debug.toString (indent screen tileSize dimensions) ++ "px"
    in
    div [ style "margin-top" "200px", style "margin-left" oneFingerSpace ]
        [ rug, button [ onClick MixTiles ] [ text "Regenerate" ] ]


indent : ScreenSize -> Int -> Grid -> Int
indent { width } tileSize { cols } =
    (round width - (tileSize * cols)) // 2


cell : Html msg -> Html msg
cell content =
    div
        [ style "width" (String.fromInt tileSize ++ "px")
        , style "height" (String.fromInt tileSize ++ "px")
        ]
        [ content ]
