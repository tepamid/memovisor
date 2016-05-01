'use strict';
import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  Dimensions
} from 'react-native';
import getImages from './imgur'

const {width, height} = Dimensions.get('window');

export class Memovisor extends React.Component {

  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); 
    this.state = { 
      dataSource: ds.cloneWithRows([]),
      loading: true 
    }; 

    getImages('A91Zr', '762d8b47c84ddaf').then((response) => {
      console.log('success', response);

      if (response) {
        const data = response.data.sort( (a,b) => a.datetime > b.datetime ? -1 : 1 )
        this.setState({
              dataSource: this.state.dataSource.cloneWithRows(data),
              loading: false,
        })
      }
    },
    (err) => {
      console.log('fetch error', err);
    })

  }

  renderRow (row) {
    if (row.link.match(/\.(jpg|png|gif)/g)) {
      return (
        <View style={styles.post}>
            <Image style={{width: width*0.9, height: height/2, resizeMode: 'contain'}} source={{uri: row.link}} />
          </View>
      )
    } else {
      return null
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <Text style={styles.heading}>Loading images…</Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          // onEndReached=
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  post: {
    flex: 1,
    marginBottom: 10,
  },
  heading: {
    fontSize: 20,
    marginTop: 20
  },
});
