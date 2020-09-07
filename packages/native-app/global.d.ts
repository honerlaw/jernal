declare module '*.svg' {

    // map our generic svg images to the svg type that is actually
    // used for each imported image
    import Svg from 'react-native-svg'
    export default Svg
}
