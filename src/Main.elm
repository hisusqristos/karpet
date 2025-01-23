module Main exposing (..)

import Browser
import Dict exposing (Dict)
import Html exposing (Html, div, img)
import Html.Attributes exposing (src, style, width)


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


indent : ScreenSize -> Float -> Grid -> Float
indent { width } tileSize { cols } =
    (width - tileSize * toFloat cols) / 2


view : Model -> Html Msg
view { screen } =
    let
        dimensions =
            { cols = 30, rows = 8 }

        rug =
            grid dimensions tiles

        oneFingerSpace =
            Debug.toString (indent screen 60 dimensions) ++ "px"
    in
    div [ style "margin-top" "200px", style "margin-left" oneFingerSpace ] [ rug ]


tiles : Dict Location (Html msg)
tiles =
    Dict.fromList [ ( ( 2, 2 ), img [ src "../tiles/horizontal.png", width 60 ] [] ), ( ( 1, 2 ), img [ src "../tiles/horizontal.png", width 60 ] [] ) ]


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
