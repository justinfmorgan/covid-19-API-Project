import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native'

// Grabs a JSON of the data when passed a country string
countryData = (country) => {
    country = country.replace(" ", "-")
    const URL = `https://api.covid19api.com/total/country/${country}`;
    return fetch(URL)
            .then((res) => res.json());
}

// Grabs a JSON of the global data
globalData = () => {
    const URL = `https://api.covid19api.com/world/total`;
    return fetch(URL)
            .then((res) => res.json());
}

getStats = () => {
  globalData()
      .then((res) => {
        var total = res['TotalConfirmed']
        var deaths = res['TotalDeaths']
        var recovered = res['TotalRecovered']
        var overallStr = "Confirmed Cases: " + total + "\nConfirmed Deaths: " + deaths + "\nConfirmed Recovered: " + recovered
        alert(overallStr)
      })
}


class App extends Component {
  state = {
    count: 0,
    country: getStats()
  }

  onPress = () => {
    this.setState({
      count: this.state.count + 1,
      country: this.state.country = getStats()
    })
  }

 render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
         style={styles.button}
         onPress={this.onPress}
        >
         <Text>Click me</Text>
        </TouchableOpacity>
        <View style={styles.countContainer}>
          <Text>
            You clicked { this.state.count } times
            Country data: { this.state.country }
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10
  }
})

export default App;
