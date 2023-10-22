import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView, TouchableOpacity, ScrollView} from 'react-native';
import { LineChart, PieChart } from "react-native-chart-kit";
import axios from 'axios';

  const LineChartYear = () => {
    const stylesTextBelow = StyleSheet.create({
      container: {
        flex: 1,
      },
      textBelowChart: {
        position: 'absolute',
        top: (Dimensions.get("window").height)*0.38,
        fontSize: 17,
        color: '#ffff', // Adjust the margin as needed
      },
    });
    return (
      <View style={stylesTextBelow.container}>
      <LineChart
      data={{
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Agu", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            data: [
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100
            ]
          }
        ]
      }}
      width={(Dimensions.get("window").width)*0.95}
      height={(Dimensions.get("window").height)*0.4}
      yAxisInterval={1}
      chartConfig={{
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#a9a9a9",
        backgroundGradientTo: "#556b2f",
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#ffa726"
        }
      }}
      verticalLabelRotation={5}
      
      bezier
      style={{
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 16,
        left: (Dimensions.get("window").width)*0.025,
  
      }}

    />
    <Text style={stylesTextBelow.textBelowChart}>Total  Items  Recycled Past Year</Text>
    </View>
    )
  }
  
  
  const LineChartWeek = () => {
    const stylesTextBelow = StyleSheet.create({
      container: {
        flex: 1,
      },
      textBelowChart: {
        position: 'absolute',
        top: (Dimensions.get("window").height)*0.38,
        fontSize: 17,
        color: '#ffff',
      },
    });
    return (
      <View style={stylesTextBelow.container}>
    <LineChart
      data={{
        labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
        datasets: [
          {
            data: [
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
            ]
          }
        ]
      }}
      width={(Dimensions.get("window").width)*0.95}
      height={(Dimensions.get("window").height)*0.4}
      yAxisLabel="$"
      yAxisSuffix="k"
      yAxisInterval={1}
      chartConfig={{
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#a9a9a9",
        backgroundGradientTo: "#556b2f",
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#ffa726"
        }
      }}
      bezier
      verticalLabelRotation={5}
      style={{
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 16,
        left: (Dimensions.get("window").width)*0.025,
  
      }}
    />

    <Text style={stylesTextBelow.textBelowChart}>Total  Items  Recycled Past Week</Text>
    </View>
    )
  }
  
  const LineChartMonth = () => {
    const stylesTextBelow = StyleSheet.create({
      container: {
        flex: 1,
      },
      textBelowChart: {
        position: 'absolute',
        top: (Dimensions.get("window").height)*0.38,
        fontSize: 17,
        color: '#ffff',
      },
    });
    return (
      <View style={stylesTextBelow.container}>
      <LineChart
      data={{
        labels: ["1 - 7", "8 - 14", "15 - 21", "21 - end"],
        datasets: [
          {
            data: [
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
            ]
          }
        ]
      }}
      width={(Dimensions.get("window").width)*0.95}
      height={(Dimensions.get("window").height)*0.4}
      yAxisInterval={1}
      chartConfig={{
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#a9a9a9",
        backgroundGradientTo: "#556b2f",
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#ffa726"
        }
      }}
      bezier
      verticalLabelRotation={5}
      style={{
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 16,
        left: (Dimensions.get("window").width)*0.025,
  
      }}
      
    />

    <Text style={stylesTextBelow.textBelowChart}>Total  Items  Recycled Past Month</Text>
    </View>
    );
  };
  
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
  };
  
  const styleProfile = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    userName: {
      marginTop:10,
      marginLeft: 20,
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    userEmail: {
      marginLeft: 20,
      fontSize: 18,
      color: 'gray',
    },
  });
  const ProfileNavigation = () => {
    return (
      <View style={styleProfile.container}>
        <Text style={styleProfile.userName}>{"Welcome, " + user.name}</Text>
        <Text style={styleProfile.userEmail}>{user.email}</Text>
      </View>
    );
  
  };
  const LogOut = () => {
    const styles = StyleSheet.create({
      container: {
        alignItems: 'center',
        paddingHorizontal: 20,
        width: (Dimensions.get("window").width)*0.96,
        left: (Dimensions.get("window").width)*0.02
      },
      button: {
        backgroundColor: '#8fbc8f',
        top: 30,
        marginBottom: 60,
        padding: 15,
        borderRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        shadowOpacity: 1,
      },
      buttonText: {
        color: 'white',
        fontSize: 13,
        fontWeight: 'bold',
      },
    });
    return (
      <SafeAreaView style = {styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {}}
      >
        <Text style={styles.buttonText}>User Log Out</Text>
      </TouchableOpacity>
        
        
        </SafeAreaView>
    )
  };
  
  

export default function ProfileScreen({ navigation }: any) {
    const [activeChart, setActiveChart] = useState(1);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
      axios.get('http://67.134.204.3/api/v1/data')
        .then((response) => {
          const dataFromApi = response.data;
          const transformedData = dataFromApi.map((item: any) => ({
            name: 'trash',
            population: item.trash,
          }));
          setChartData(transformedData);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []);

  const ButtonChoices = () => {
    const toggleChart = (chartNumber: number) => {
      setActiveChart(chartNumber);
    };
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        width: (Dimensions.get("window").width)*0.96,
        left: (Dimensions.get("window").width)*0.02
      },
      button: {
        backgroundColor: '#3cb371',
        padding: 15,
        borderRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        shadowOpacity: 1,
      },
      buttonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
      },
    });
    return (
      <SafeAreaView style = {styles.container}>
        <TouchableOpacity
        style={styles.button}
        onPress={() => toggleChart(1)}
      >
        <Text style={styles.buttonText}>Last Year</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => toggleChart(2)}
      >
        <Text style={styles.buttonText}>Last Month</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => toggleChart(3)}
      >
        <Text style={styles.buttonText}>Last Week</Text>
      </TouchableOpacity>
        </SafeAreaView>
    )
  }
  
    return (
        <ScrollView>
      <ProfileNavigation></ProfileNavigation>
      
      {activeChart == 1 && <LineChartYear/>}
      {activeChart == 2 && <LineChartMonth/>}
      {activeChart == 3 && <LineChartWeek/>} 
      <ButtonChoices></ButtonChoices>

<PieChart
  data={chartData}
  width={(Dimensions.get("window").width)*0.95}
  height={(Dimensions.get("window").height)*0.25}
  chartConfig={{
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  }}
  accessor={"population"}
  backgroundColor={ '#bbd9b4'}
  paddingLeft="15"
  
  center={[10, 10]}
  style = {{
    borderRadius: 16,
    left: (Dimensions.get("window").width)*0.025,
    marginTop: 50,
  }}
/>

<LogOut></LogOut>

</ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 10,
      borderRadius: 16
    }, 
  });