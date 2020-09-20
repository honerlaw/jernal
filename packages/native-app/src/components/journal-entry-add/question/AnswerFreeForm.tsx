import { View } from "native-base"
import { TextInput, StyleSheet } from "react-native"
import React, { useState } from "react"
import { SIZING } from "../../../util/constant"

const STYLES = StyleSheet.create({
    textarea: {
        marginTop: SIZING.B,
        fontSize: SIZING.C
    }
})

type AnswerFreeFormProps = {
    onChange: (text: string) => void
}

export const AnswerFreeForm: React.FC<AnswerFreeFormProps> = ({ onChange }) => {
    const [text, setText] = useState('')
    const [height, setHeight] = useState<number | null>(0)

    const HeightStyle = height !== null && {
        height: height + 16
    }

    const onChangeText = (text: string) => {
        setText(text)
        onChange(text)
    }

    return <View>
        <TextInput style={[STYLES.textarea, HeightStyle]}
            multiline={true}
            value={text}
            onChangeText={onChangeText}
            onContentSizeChange={(e) => setHeight(e.nativeEvent.contentSize.height)}
            placeholder={"Add your additional thoughts here."}></TextInput>
    </View>
}