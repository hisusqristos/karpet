module Main exposing (..)

import Browser
import Dict exposing (Dict)
import Html exposing (Html, button, div, img, text)
import Html.Attributes exposing (src, style, width)
import Html.Events exposing (onClick)
import Random exposing (Generator)
import Tiles exposing (randomTiles, tileSize)


type alias Model =
    { screen : ScreenSize, radar : Dict Location (Html Msg), dimensions : Grid }


init : Flags -> ( Model, Cmd Msg )
init flags =
    ( { screen = flags, radar = Dict.empty, dimensions = { cols = 20, rows = 10 } }, Cmd.none )


type alias Grid =
    { cols : Int, rows : Int }


type alias Location =
    ( Int, Int )


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


type Msg
    = NewRug (Dict Location (Html Msg))
    | MixTiles


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        MixTiles ->
            ( model, Random.generate NewRug (randomRadar model.dimensions) )

        NewRug newRug ->
            ( { model | radar = newRug }, Cmd.none )


randomRadar : Grid -> Generator (Dict Location (Html Msg))
randomRadar rug =
    let
        coordinates =
            Random.constant <| locations rug

        tileCount =
            rug.cols * rug.rows
    in
    randomTiles tileCount
        |> Random.map2 (List.map2 Tuple.pair) coordinates
        |> Random.map Dict.fromList


grid : Grid -> Dict Location (Html msg) -> Html msg
grid size tileMap =
    let
        cellsForRow : Int -> List ( Int, Int )
        cellsForRow row =
            List.range 1 size.cols |> List.map (\column -> ( row, column ))

        gridByRows : List (List ( Int, Int ))
        gridByRows =
            List.range 1 size.rows |> List.map cellsForRow

        tileOn xy =
            tileMap
                |> Dict.get xy
                |> Maybe.withDefault (img [ src "../tiles/vertical.png", width tileSize ] [])

        markupForRow : List Location -> Html msg
        markupForRow =
            List.map (tileOn >> cell)
                >> div [ style "display" "flex" ]
    in
    div [ style "display" "inline-block" ]
        (gridByRows |> List.map markupForRow)


indent : ScreenSize -> Int -> Grid -> Int
indent { width } tileSize { cols } =
    ((width - toFloat (tileSize * cols)) / 2)
        |> floor


cell : Html msg -> Html msg
cell content =
    div
        [ style "width" (String.fromInt tileSize ++ "px")
        , style "height" (String.fromInt tileSize ++ "px")
        ]
        [ content ]


locations : Grid -> List Location
locations { cols, rows } =
    let
        columns =
            List.range 1 cols

        eachRow =
            List.range 1 rows

        pairColsRows currentRow alreadyPaired =
            columns
                |> List.map (Tuple.pair currentRow)
                |> (++) alreadyPaired
    in
    eachRow
        |> List.foldl pairColsRows []


type alias ScreenSize =
    { width : Float, height : Float }


type alias Flags =
    ScreenSize


main : Program Flags Model Msg
main =
    Browser.element { init = init, view = view, update = update, subscriptions = \_ -> Sub.none }
