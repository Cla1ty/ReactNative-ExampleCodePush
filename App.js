/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import CodePush from 'react-native-code-push';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      log: "",
    }
    console.log('constructor ', this.state);
  
  }

  componentDidMount() {

    CodePush.getUpdateMetadata(CodePush.UpdateState.RUNNING).then((update) => {
      this.updateLog('getUpdateMetadata RUNNING ' + update);
      console.log('getUpdateMetadata RUNNING', update);
    });

    CodePush.getUpdateMetadata(CodePush.UpdateState.RELEASE).then((update) => {
      this.updateLog('getUpdateMetadata RELEASE ' + update);
      console.log('getUpdateMetadata RELEASE', update);
    });

    CodePush.getUpdateMetadata(CodePush.UpdateState.PENDING).then((update) => {
      this.updateLog('getUpdateMetadata PENDING ' + update);
      console.log('getUpdateMetadata PENDING', update);
    });
  }

  codePushStatusDidChange(status) {
    switch (status) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        this.updateLog('Checking for updates.');
        console.log('Checking for updates.');
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        this.updateLog('Downloading package.');
        console.log('Downloading package.');
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        this.updateLog('Installing update.');
        console.log('Installing update.');
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        this.updateLog('Up-to-date.');
        console.log('Up-to-date.');
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        this.updateLog('Update installed.');
        console.log('Update installed.');
        break;
    }
  }

  updateLog(message) {
    var log = this.state.log;
    log = log + '\n' + message;
    this.setState({
      log: log,
    });
  }

  codePushDownloadDidProgress(progress) {
    this.updateLog(progress.receivedBytes + ' of ' + progress.totalBytes + ' received.');
    console.log(
      progress.receivedBytes + ' of ' + progress.totalBytes + ' received.',
    );
  }
  render() {
    var number1 = 1
    var number2 = 2
    var result = number1 < number2 ? number2 : number1

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Versi 1.0.0</Text>
                <Text style={styles.sectionDescription}>Hallo</Text>
                <Text style={styles.sectionDescription}>if {number1} {"<"} {number2} then show {result} </Text>
                <View
                  style={{
                    height: 100,
                  }}
                />
                <Text style={styles.sectionDescription}>{this.state.log}</Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

MyApp = CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  installMode: CodePush.InstallMode.ON_NEXT_RESUME,
})(App);

export default MyApp;
