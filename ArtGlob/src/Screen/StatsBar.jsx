import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatsBar = ({ data }) => {
  const maxDataValue = Math.max(...data.datasets[0].data);
  const scaleFactor = 100 / maxDataValue; // Scale factor for bar heights

  return (
    <View style={styles.container}>
      {data.labels.map((label, index) => (
        <View key={index} style={styles.barContainer}>
                  <Text style={styles.barValue}>{data?.datasets[0]?.data[index]?.toString()}</Text>
          <View
            style={[
              styles.bar,
              {
                height: `${data.datasets[0].data[index] * scaleFactor}%`,
                backgroundColor: barColors[index % barColors.length], // Use the same bar colors
              },
            ]}
          />
          <Text style={styles.label}>{label}</Text>
          {/* <Text style={styles.barValue}>{data.datasets[0]}</Text> Transform to string */}

        </View>
      ))}
    </View>
  );
};

const barColors = ['rgba(128, 0, 0, 0.8)', 'rgba(0, 128, 0, 0.8)', 'rgba(0, 0, 128, 0.8)', 'rgba(128, 128, 0, 0.8)', 'rgba(0, 128, 128, 0.8)'];

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    height: 200,
  },
  barContainer: {
    alignItems: 'center',
    width: '20%',
  },
  bar: {
    width: 25,
    borderRadius: 10,
  },
  label: {
    marginTop: 5,
    fontSize: 10,
    textAlign: 'center',
    color: 'black',
  },
  barValue: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
});

export default StatsBar;
