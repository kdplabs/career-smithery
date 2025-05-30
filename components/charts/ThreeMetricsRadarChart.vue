<template>
  <div ref="chartContainer" class="w-full h-96"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import Plotly from 'plotly.js-dist-min'

const props = defineProps<{
  performance: 'Low' | 'Moderate' | 'High'
  potential: 'Low' | 'Moderate' | 'High'
  engagement: 'Low' | 'Moderate' | 'High'
}>()

const chartContainer = ref<HTMLElement | null>(null)

// Map string values to numeric values (1-3 scale)
const valueToNumeric = (value: string): number => {
  const values = { 'Low': 1, 'Moderate': 2, 'High': 3 }
  return values[value as keyof typeof values]
}

// Create the radar chart
const createChart = () => {
  if (!chartContainer.value) return

  // Clear existing plot
  Plotly.purge(chartContainer.value)

  // Convert the props to numeric values (1-3 scale)
  const performanceValue = valueToNumeric(props.performance)
  const potentialValue = valueToNumeric(props.potential)
  const engagementValue = valueToNumeric(props.engagement)

  // Create data for the radar chart (current values)
  const currentValues = {
    type: 'scatterpolar',
    r: [performanceValue, potentialValue, engagementValue, performanceValue], // Close the polygon
    theta: ['Performance', 'Potential', 'Engagement', 'Performance'], // Close the polygon
    fill: 'toself',
    fillcolor: 'rgba(239, 68, 68, 0.5)', // Red with higher opacity
    line: {
      color: 'rgb(239, 68, 68)', // Red
      width: 3
    },
    name: 'Current Position',
    hoverinfo: 'text',
    text: [`Performance: ${props.performance}<br>Potential: ${props.potential}<br>Engagement: ${props.engagement}`],
  }

  // Add reference polygons for each level
  const lowLevel = {
    type: 'scatterpolar',
    r: [1, 1, 1, 1],
    theta: ['Performance', 'Potential', 'Engagement', 'Performance'],
    fill: 'toself',
    fillcolor: 'rgba(229, 231, 235, 0.2)', // Light gray
    line: {
      color: 'rgb(209, 213, 219)', // Gray
      width: 1,
      dash: 'dot'
    },
    name: 'Low',
    hoverinfo: 'none',
    showlegend: false
  }
  
  const mediumLevel = {
    type: 'scatterpolar',
    r: [2, 2, 2, 2],
    theta: ['Performance', 'Potential', 'Engagement', 'Performance'],
    fill: 'toself',
    fillcolor: 'rgba(229, 231, 235, 0.2)', // Light gray
    line: {
      color: 'rgb(209, 213, 219)', // Gray
      width: 1,
      dash: 'dot'
    },
    name: 'Moderate',
    hoverinfo: 'none',
    showlegend: false
  }
  
  const highLevel = {
    type: 'scatterpolar',
    r: [3, 3, 3, 3],
    theta: ['Performance', 'Potential', 'Engagement', 'Performance'],
    fill: 'toself',
    fillcolor: 'rgba(229, 231, 235, 0.2)', // Light gray
    line: {
      color: 'rgb(209, 213, 219)', // Gray
      width: 1,
      dash: 'dot'
    },
    name: 'High',
    hoverinfo: 'none',
    showlegend: false
  }
  
  // Create the ideal position (all High)
  const idealPosition = {
    type: 'scatterpolar',
    r: [3, 3, 3, 3],
    theta: ['Performance', 'Potential', 'Engagement', 'Performance'],
    fill: 'toself',
    fillcolor: 'rgba(16, 185, 129, 0.5)', // Green with higher opacity
    line: {
      color: 'rgb(16, 185, 129)', // Green
      width: 3
    },
    name: 'Ideal Position',
    hoverinfo: 'text',
    text: ['Ideal Position<br>Performance: High<br>Potential: High<br>Engagement: High'],
  }

  // Layout configuration
  const layout = {
    autosize: true,
    height: chartContainer.value.clientHeight,
    width: chartContainer.value.clientWidth,
    margin: {
      l: 50,
      r: 50,
      b: 80, // Increased to allow more space for legend
      t: 50,
    },
    polar: {
      radialaxis: {
        visible: true,
        range: [0, 3],
        tickvals: [1, 2, 3],
        ticktext: ['Low', 'Moderate', 'High'],
        tickfont: {
          size: 10,
        },
        angle: 45,
        tickangle: 0,
      },
      angularaxis: {
        tickfont: {
          size: 14,
          color: '#333',
          family: 'Arial, sans-serif',
        },
        rotation: 0,
        direction: 'clockwise',
      },
      bgcolor: 'rgba(245, 247, 250, 0.8)'
    },
    showlegend: true,
    legend: {
      x: 0,
      y: -0.25, // Increased distance from chart
      xanchor: 'left',
      yanchor: 'top',
      orientation: 'h',
      bgcolor: 'rgba(255, 255, 255, 0.9)', // Increased opacity
      bordercolor: '#cbd5e1',
      borderwidth: 1,
      traceorder: 'grouped',
      itemsizing: 'constant',
      itemwidth: 80, // Increased width for legend items
      itemclick: false,
      itemdoubleclick: false,
      font: {
        size: 12
      },
      xgap: 40, // Increased gap between legend items
    },
    annotations: []
  }

  // Important: Show ideal position first for better layering, then current position
  Plotly.newPlot(
    chartContainer.value,
    [lowLevel, mediumLevel, highLevel, idealPosition, currentValues],
    layout,
    {
      responsive: true,
      displayModeBar: false,
    }
  )
}

// Handle resizing
const handleResize = () => {
  if (chartContainer.value) {
    Plotly.relayout(chartContainer.value, {
      width: chartContainer.value.clientWidth,
      height: chartContainer.value.clientHeight
    })
  }
}

onMounted(() => {
  createChart()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  if (chartContainer.value) {
    Plotly.purge(chartContainer.value)
  }
})

watch(
  () => [props.performance, props.potential, props.engagement],
  () => {
    createChart()
  }
)
</script>

<script lang="ts">
export default {
  name: 'ThreeMetricsRadarChart'
}
</script> 