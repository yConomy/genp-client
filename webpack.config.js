const path                          = require( "path" );
const { CleanWebpackPlugin }        = require( "clean-webpack-plugin" );
const MiniCssExtractPlugin          = require( "mini-css-extract-plugin" );

const mode                          =
{
    value                           : process.env.MODE,
    isPdt                           : this.value === "pdt",
    isDev                           : this.value === "dev"
};

const entry                         =
{
    main                            : "./__in/index.js"
};

const output                        =
{
    filename                        : "js/[name].js",
    path                            : path.resolve( __dirname, "__out" ),
    assetModuleFilename             : "image/[name][ext]"
};

const plugins                       =
[
    new CleanWebpackPlugin
    ({ 
        cleanStaleWebpackAssets     : false
    }),
    new MiniCssExtractPlugin
    ({
        filename                    : "css/style.css"
    })
]

const miniCssExtractPluginLoader    =
{
    loader                          : MiniCssExtractPlugin.loader
};

const cssLoader                     =
{
    loader                          : "css-loader",
    options                         :
    {
        sourceMap                   : mode.isDev,
        importLoaders               : 2
    }
};

const postcssLoader                 =
{
    loader                          : "postcss-loader",
    options                         :
    {
        postcssOptions              :
        {
            plugins                 : 
            [
                [ "autoprefixer", { grid: true } ]
            ]
        }
    }
};

const sassLoader                    =
{
    loader                          : "sass-loader",
    options                         :
    {
        sourceMap                   : mode.isDev,
    }
}

const fileRule                      =
{
    test                            : /\.(png|jpe?g|gif)$/i,
    type                            : "asset/resource"
};

const styleRule                     =
{
    test                            : /\.scss$/i,
    use                             :
    [
        miniCssExtractPluginLoader,
        cssLoader,
        postcssLoader,
        sassLoader
    ]
};

const tsLoader                      =
{
    loader                          : "ts-loader",
    options                         :
    {
        transpileOnly               : true
    }
};

const tsRule                        =
{
    test                            : /\.tsx?$/i,
    use                             :
    [
        tsLoader
    ]
};

const vueLoader                     =
{
    loader                          : "vue-loader",
    options                         :
    {
        postcss                     :
        {
            plugins                 : postcssLoader.plugins
        },
        ts                          : [ tsLoader ]
    }
};

const vueRule                       =
{
    test                            : /\.vue$/i,
    use                             :
    [
        vueLoader
    ]
}

module.exports                      = 
{
    entry                           : entry,
    output                          : output,
    module                          :
    {
        rules                       : 
        [
            fileRule,
            styleRule,
            tsRule,
            vueRule
        ]
    },
    plugins                         : plugins,
    devtool                         : "source-map",
    watchOptions                    :
    {
        ignored                     : "node_modules"
    },
    stats                           :
    {
        warningsFilter              : [ /export .* was not found in/ ]
    }
};