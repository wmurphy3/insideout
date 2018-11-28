import React, {Component}         from 'react'
import { Field }                  from 'redux-form'
import { View, Text, TextInput }  from 'react-native'
import { TextInputMask }          from 'react-native-masked-text'
import colors                     from '*/views/components/atoms/Colors'

export default class CreditCardInput extends Component {

  constructor(props) {
   super(props);
   this.state = {
     amount: this.props.input.value
   }
   this._onChange = this._onChange.bind(this);
  }

  _onChange(text) {
    text = text.replace(/\s/g,'')
    this.props.input.onChange(text)

    this.setState({
      amount: text
    })
  }

  render() {
    const { input, type, disabled, validate, required, placeholder, description,
            label, className, children, style, meta: { touched, error, warning } } = this.props

    return(
      <View style={[style, {marginBottom: 15}]}>
        <TextInputMask
        	type={'credit-card'}
          returnKeyType='done'
          style={{ minHeight: 42, borderWidth: 1, borderColor: '#e7eaec', color: (disabled ? '#d4d8db' : '#838383'), borderRadius: 5}}
          inputStyle={{paddingLeft: 10, color: (disabled ? '#d4d8db' : '#838383'), fontSize: 18, lineHeight: 42,}}
          onChangeText={this._onChange}
          value={this.state.amount}
        	placeholder={'0000 0000 0000 0000'}
        />
        {touched &&
          ((error && <Text style={{margin:5, fontSize: 12, color: '#ff190c'}}>{error}</Text>))}
      </View>
    )
  }
}
