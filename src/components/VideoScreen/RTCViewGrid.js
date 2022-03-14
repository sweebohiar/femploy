import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {RTCView} from 'react-native-connectycube';
import {CallService} from '../../services';
import CallingLoader from './CallingLoader';

export default ({streams}) => {
  const RTCViewRendered = ({userId, stream}) => {
    if (stream) {
      console.log('yeet');
      console.log(userId);
      // const profilePic =
      //   userId === 3743441
      //     ? require('../../../assets/juay.jpg')
      //     : require('../../../assets/joshen.jpg');
      if (userId === 3743441) {
        return (
          <Image
            source={require('../../../assets/juay.jpg')}
            resizeMode="contain"
            style={styles.profilePic}
          />
        );
      }
      return (
        <Image
          source={require('../../../assets/joshen.jpg')}
          resizeMode="contain"
          style={styles.profilePic}
        />
      );
    }

    return (
      <View style={styles.blackView}>
        <CallingLoader name={CallService.getUserById(userId, 'name')} />
      </View>
    );
  };

  const streamsCount = streams.length;

  let RTCListView = null;

  switch (streamsCount) {
    case 1:
      RTCListView = (
        <RTCViewRendered
          userId={streams[0].userId}
          stream={streams[0].stream}
        />
      );
      break;

    case 2:
      RTCListView = (
        <View style={styles.inColumn}>
          <RTCViewRendered
            userId={streams[0].userId}
            stream={streams[0].stream}
          />
          <RTCViewRendered
            userId={streams[1].userId}
            stream={streams[1].stream}
          />
        </View>
      );
      break;

    case 3:
      RTCListView = (
        <View style={styles.inColumn}>
          <View style={styles.inRow}>
            <RTCViewRendered
              userId={streams[0].userId}
              stream={streams[0].stream}
            />
            <RTCViewRendered
              userId={streams[1].userId}
              stream={streams[1].stream}
            />
          </View>
          <RTCViewRendered
            userId={streams[2].userId}
            stream={streams[2].stream}
          />
        </View>
      );
      break;

    case 4:
      RTCListView = (
        <View style={styles.inColumn}>
          <View style={styles.inRow}>
            <RTCViewRendered
              userId={streams[0].userId}
              stream={streams[0].stream}
            />
            <RTCViewRendered
              userId={streams[1].userId}
              stream={streams[1].stream}
            />
          </View>
          <View style={styles.inRow}>
            <RTCViewRendered
              userId={streams[2].userId}
              stream={streams[2].stream}
            />
            <RTCViewRendered
              userId={streams[3].userId}
              stream={streams[3].stream}
            />
          </View>
        </View>
      );
      break;

    default:
      break;
  }

  return <View style={styles.blackView}>{RTCListView}</View>;
};

const styles = StyleSheet.create({
  blackView: {
    flex: 1,
    backgroundColor: 'black',
  },
  inColumn: {
    flex: 1,
    flexDirection: 'column',
  },
  inRow: {
    flex: 1,
    flexDirection: 'row',
  },
  profilePic: {
    height: '50%',
    width: '100%',
  },
});
