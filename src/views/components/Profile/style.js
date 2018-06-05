import colors        from '*/views/components/atoms/Colors'

export default {
  mainBackground: {
    backgroundColor: colors.background,
    flex: 1
  },
  button: {
    backgroundColor: colors.main,
    marginTop: 10,
    width: '100%'
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  due_title: {
    color: colors.label,
    fontSize: 13,
  },
  border_bottom: {
    borderBottomWidth: 1,
    borderColor: colors.border,
    padding: 20,
    paddingTop: 0
  },
  table_header: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'left'
  },
  table_data: {
    fontSize: 18,
    textAlign: 'left'
  },
  row: {
    width: '50%'
  },
  reverse_button: {
    backgroundColor: '#fff',
    marginTop: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: colors.main
  },
  link: {
    color: colors.main
  },
  center_text: {
    textAlign: 'center'
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  distance: {
    fontStyle: 'italic',
    fontSize: 12,
    paddingHorizontal: 10
  },
  column: {
    width: '50%'
  },
  padding: {
    paddingHorizontal: 10,
    paddingTop: 10
  }
}
