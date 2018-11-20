import React, { Component }                 from 'react'
import { View, List, ScrollView, ListItem } from 'react-native'
import InterestInput                        from '*/views/components/atoms/InterestInput'
import { Field, FieldArray }                from 'redux-form'
import { Button, Icon }                     from 'react-native-elements'

export const InterestFields = ({ fields, meta: { error } }) =>
  <View style={{flex: 1, borderTopWidth: 0}}>
    <ScrollView style={{flex: 1, borderTopWidth: 0}}>
    {fields.map((item, i) => (
      <View style={{flexDirection: 'row'}} key={i}>
        <View style={{width: '80%'}}>
          <Field
            name={item}
            placeholder={`Interest #${i + 1}`}
            component={InterestInput} />
        </View>
        <View style={{width: '20%'}}>
          {(fields.length - 1) === i ?
            <Icon
              raised
              name='plus'
              type='font-awesome'
              color='green'
              size={20}
              onPress={() => fields.push()} />
            :
            <Icon
              raised
              name='remove'
              type='font-awesome'
              color='#F05757'
              size={20}
              onPress={() => fields.remove(i)} />
          }
        </View>
      </View>
    ))}

    </ScrollView>
  </View>
