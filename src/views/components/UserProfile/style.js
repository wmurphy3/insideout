import colors        from '*/views/components/atoms/Colors'

export default {
  mainBackground: {
    backgroundColor: colors.background,
    flex: 1
  },
  container: {
    flexDirection: 'row',
    padding: 10,
  },
  text: {
    flex: 1
  },
  row: {
    width: '100%'
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
  button: {
    backgroundColor: colors.main,
    marginTop: 10
  },
  column: {
    width: '50%'
  },
  padding: {
    paddingHorizontal: 10,
    paddingTop: 10
  },
  contact_link: {
    color: colors.main,
    fontSize: 10,
    textAlign: 'center',
    marginTop: 10
  }
}
