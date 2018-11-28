import React, { Component }                 from 'react'
import { View, List, ScrollView, ListItem } from 'react-native'
import InterestInput                        from '*/views/components/atoms/InterestInput'
import { Field, FieldArray }                from 'redux-form'
import { Button, Icon }                     from 'react-native-elements'

export const InterestFields = ({ fields, meta: { error } }) =>
  <View style={{flex: 1, borderTopWidth: 0}}>
    <ScrollView style={{flex: 1, borderTopWidth: 0}}>
    {fields.map((item, i) => (
        <Field
          name={item}
          key={i}
          placeholder={`Interest #${i + 1}`}
          icon={(fields.length - 1) === i ? 'plus' : 'remove'}
          buttonPressed={()=> ((fields.length - 1) === i ? fields.push() : fields.remove(i))}
          component={InterestInput} />
    ))}
    </ScrollView>
  </View>
