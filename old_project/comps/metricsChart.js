import React from "react";
import {Radar} from "react-chartjs-2";

const MetricsChart = (props) => {

    let danceability=0;
    let energy=0;
    let liveness=0;
    let loudness=0;
    let tempo=0;
    let valence=0;
    let acousticness=0;
    let instrumentalness=0;
    let speechiness=0;
    let numSongs = props.data.metrics.length;
    props.data.metrics.forEach((song, index) => {
        danceability += song.danceability;
        energy += song.energy;
        liveness += song.liveness;
        loudness +=song.loudness;
        tempo += song.tempo;
        valence += song.valence;
        acousticness+=song.acousticness;
        instrumentalness+=song.instrumentalness;
        speechiness+=song.speechiness;
    });
    danceability = danceability/numSongs;
    energy=energy/numSongs;
    liveness=liveness/numSongs;
    loudness=loudness/numSongs;
    tempo=tempo/numSongs;
    valence=valence/numSongs;
    acousticness=acousticness/numSongs;
    instrumentalness=instrumentalness/numSongs;
    speechiness=speechiness/numSongs;

    const radarData = {
        labels: ['Danceability', 'Energy', 'Liveness', 'Valence', 'Acoutiscness', 'Instrumentalness', 'Speechiness'],
        datasets: [
          {
            
            backgroundColor: 'rgba(30, 215, 96, 0.4)',
            borderColor:  'white',
            label: "Playlist Analysis",
    radius: 6,
    pointRadius: 6,
    pointBorderWidth: 3,
    pointBackgroundColor: "#1DB954",
    pointBorderColor: "white",
    pointHoverRadius: 10,

            data: [danceability, energy, liveness, valence, acousticness, instrumentalness, speechiness],
          }
        ],
        options: {
            maintainAspectRatio: false,
            responsive: true,
        }
      }
      var chartOptions = {
        scale: {
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 1,
            stepSize: 0.2,
            fontSize: 12
          },
          pointLabels: {
            fontSize: 18,
            fontColor: "#A9A9A9"
          },
          gridLines: {
            display: true,
            color: '#A9A9A9'
        },
        legend: {
          display:false
        }
        }
      }
    return (
      <div>
          <Radar data={radarData} options = {chartOptions}/>
      </div>
    )
  }
  
  export default MetricsChart;