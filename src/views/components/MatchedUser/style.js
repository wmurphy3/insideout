import colors        from '*/views/components/atoms/Colors'

export default {
  mainBackground: {
    flex: 1
  },
  container: {
    flexDirection: 'row',
    padding: 10,
    paddingLeft: 0
  },
  text: {
    flex: 1
  },
  row: {
    width: '100%'
  },
  distance: {
    fontStyle: 'italic',
    fontSize: 14
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  table_header: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  table_data: {
    fontSize: 14,
    textAlign: 'right'
  },
  row: {
    width: '50%'
  },
  listView: {
    marginTop: 5,
    paddingVertical: 0,
    borderBottomWidth: 1,
    borderColor: '#e7eaec',
    paddingBottom: 5
  },
  button: {
    backgroundColor: colors.main,
    marginTop: 10,
    padding: 5,
    borderRadius: 5
  },
  interestButton: {
    borderRadius: 20,
    padding: 2,
    margin: 5,
    borderColor: colors.main,
    borderWidth: 1,
    backgroundColor: '#fff'
  },
  contact_link: {
    color: colors.main,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10
  }
}
