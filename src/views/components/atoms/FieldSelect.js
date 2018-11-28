import React, { Component }               from 'react'
import { View, StyleSheet, Dimensions, Text }   from 'react-native'
import SelectInput                        from 'react-native-select-input-ios'
import colors                             from '*/views/components/atoms/Colors'

export default class FieldSelect extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      value: String(props.input.value) || null,
      // TODO: Figure out color for placeholder
      color: props.placeholder ? '#C7C7CD' : '#e7eaec'
    }
    this.onSubmit = this.onSubmit.bind(this);
  }

  setupOptions() {
    const { options, placeholder } = this.props
    if(options[0]["label"] != (placeholder ? placeholder : "")) {
      options.unshift({value: null, label: (placeholder ? placeholder : "")})
    }

    return options
  }

  onSubmit(value) {
    this.setState({
      value: value,
      color: '#e7eaec'
    })
    this.props.input.onChange(value)
  }

  render() {
    const { label, required, options, placeholder, style, width, meta: { touched, visited, error, warning } } = this.props

    const SCREEN_WIDTH = Dimensions.get('window').width;

    const styles = StyleSheet.create({
      selectInput: {
        minHeight:        42,
        backgroundColor:  '#FFFFFF',
        flexDirection:    'row',
        borderWidth: 1,
        borderColor: '#e7eaec',
        borderRadius: 5
      },
      selectInputLarge: {
        width: SCREEN_WIDTH - width
      }
    });

    return (
      <View style={[style, {marginBottom: 15}]}>
        <SelectInput
          value={this.state.value}
          options={this.setupOptions()}
          onCancelEditing={() => console.log('onCancel')}
          onSubmitEditing={this.onSubmit}
          labelStyle={{color: this.state.color, fontSize: 18, lineHeight: 42, paddingLeft: 10}}
          style={[styles.selectInput, styles.selectInputLarge]}
        />
        {touched &&
          ((error && <Text style={{margin:5, fontSize: 12, color: '#ff190c'}}>{error}</Text>))}
      </View>
    );
  }
}
