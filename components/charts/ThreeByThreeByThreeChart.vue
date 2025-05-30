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

// Map string values to numeric indices
const valueToIndex = (value: string): number => {
  const values = ['Low', 'Moderate', 'High']
  return values.indexOf(value)
}

// Create the 3D scatter plot
const createPlot = () => {
  if (!chartContainer.value) return

  // Clear existing plot
  Plotly.purge(chartContainer.value)

  // Define the cube grid points (27 points for 3x3x3 grid)
  const performanceValues = []
  const potentialValues = []
  const engagementValues = []
  const text = []

  // Create base grid points
  for (let p = 0; p < 3; p++) { // Performance
    for (let t = 0; t < 3; t++) { // Potential
      for (let e = 0; e < 3; e++) { // Engagement
        performanceValues.push(p)
        potentialValues.push(t)
        engagementValues.push(e)
        
        const performanceLabel = p === 0 ? 'Low' : p === 1 ? 'Moderate' : 'High'
        const potentialLabel = t === 0 ? 'Low' : t === 1 ? 'Moderate' : 'High'
        const engagementLabel = e === 0 ? 'Low' : e === 1 ? 'Moderate' : 'High'
        
        text.push(`Performance: ${performanceLabel}<br>Potential: ${potentialLabel}<br>Engagement: ${engagementLabel}`)
      }
    }
  }

  // Create traces for different point types with names for the legend
  const traces = []
  
  // Regular grid points (blue)
  traces.push({
    x: performanceValues,
    y: potentialValues,
    z: engagementValues,
    mode: 'markers',
    type: 'scatter3d',
    marker: {
      size: 8,
      color: '#3B82F6',
      opacity: 0.7,
    },
    text,
    hoverinfo: 'text',
    name: 'Grid Points',
    showlegend: true
  })
  
  // Selected point (red)
  const selectedP = valueToIndex(props.performance)
  const selectedT = valueToIndex(props.potential)
  const selectedE = valueToIndex(props.engagement)
  
  traces.push({
    x: [selectedP],
    y: [selectedT],
    z: [selectedE],
    mode: 'markers',
    type: 'scatter3d',
    marker: {
      size: 14,
      color: '#ef4444',
      opacity: 1,
      symbol: 'circle',
    },
    text: [`Current Position<br>Performance: ${props.performance}<br>Potential: ${props.potential}<br>Engagement: ${props.engagement}`],
    hoverinfo: 'text',
    name: 'Current Position',
    showlegend: true
  })
  
  // High-High-High point (green) for ideal state
  traces.push({
    x: [2],
    y: [2],
    z: [2],
    mode: 'markers',
    type: 'scatter3d',
    marker: {
      size: 12,
      color: '#10b981',
      opacity: 1,
    },
    text: ['Ideal Position<br>Performance: High<br>Potential: High<br>Engagement: High'],
    hoverinfo: 'text',
    name: 'Ideal Position',
    showlegend: true
  })
  
  // Create colored walls (planes) for the three dimensions
  const walls = createColoredWalls()
  traces.push(...walls)
  
  // Create grid lines for the cube
  const gridLines = createGridLines()
  
  // Add grid lines to traces
  traces.push(...gridLines)

  // Layout configuration
  const layout = {
    autosize: true,
    margin: {
      l: 0,
      r: 0,
      b: 30, // Increased bottom margin to provide more space for legend
      t: 10,
    },
    scene: {
      xaxis: {
        title: '',
        showticklabels: false,
        tickvals: [0, 1, 2],
        ticktext: ['', '', ''],
        gridcolor: '#eeeeee',
        zerolinecolor: '#f43f5e',
        zerolinewidth: 2,
        showbackground: false,
        showspikes: false,
      },
      yaxis: {
        title: '',
        showticklabels: false,
        tickvals: [0, 1, 2],
        ticktext: ['', '', ''],
        gridcolor: '#eeeeee',
        zerolinecolor: '#3b82f6',
        zerolinewidth: 2,
        showbackground: false,
        showspikes: false,
      },
      zaxis: {
        title: '',
        showticklabels: false,
        tickvals: [0, 1, 2],
        ticktext: ['', '', ''],
        gridcolor: '#eeeeee',
        zerolinecolor: '#10b981',
        zerolinewidth: 2,
        showbackground: false,
        showspikes: false,
      },
      camera: {
        eye: { x: 1.75, y: 1.75, z: 1.75 }
      },
      dragmode: 'orbit'
    },
    showlegend: true,
    legend: {
      x: 0,
      y: -0.12, // Position below the chart
      xanchor: 'left',
      yanchor: 'top',
      orientation: 'h',
      bgcolor: 'rgba(255, 255, 255, 0.7)',
      bordercolor: '#cbd5e1',
      borderwidth: 1,
      traceorder: 'normal',
      itemsizing: 'constant',
      itemwidth: 40, // Control width of legend items
      itemclick: false,
      itemdoubleclick: false,
      font: {
        size: 12
      },
      xgap: 20, // Add horizontal spacing between items
    }
  }

  // Create the plot
  Plotly.newPlot(chartContainer.value, traces, layout, {
    responsive: true,
    displayModeBar: true,
    modeBarButtonsToRemove: ['toImage', 'sendDataToCloud'],
  })
}

// Create colored walls (planes) for each dimension
const createColoredWalls = () => {
  const walls = []

  // Performance plane (X axis) - Red
  walls.push({
    type: 'mesh3d',
    x: [0, 2, 2, 0],
    y: [0, 0, 0, 0],
    z: [0, 0, 2, 2],
    i: [0],
    j: [1],
    k: [2],
    color: '#f43f5e',
    opacity: 0.25,
    showlegend: false,
    hoverinfo: 'none',
    name: 'Performance Wall'
  })
  
  // Potential plane (Y axis) - Blue
  walls.push({
    type: 'mesh3d',
    x: [0, 0, 0, 0],
    y: [0, 2, 2, 0],
    z: [0, 0, 2, 2],
    i: [0],
    j: [1],
    k: [2],
    color: '#3b82f6',
    opacity: 0.25,
    showlegend: false,
    hoverinfo: 'none',
    name: 'Potential Wall'
  })
  
  // Engagement plane (Z axis) - Green
  walls.push({
    type: 'mesh3d',
    x: [0, 2, 2, 0],
    y: [0, 0, 2, 2],
    z: [0, 0, 0, 0],
    i: [0],
    j: [1],
    k: [2],
    color: '#10b981',
    opacity: 0.25,
    showlegend: false,
    hoverinfo: 'none',
    name: 'Engagement Wall'
  })

  // Add thicker, colored axis lines
  // Performance (X) axis - Red
  walls.push({
    x: [0, 2.1],
    y: [0, 0],
    z: [0, 0],
    mode: 'lines',
    type: 'scatter3d',
    line: {
      color: '#f43f5e',
      width: 8
    },
    showlegend: false,
    hoverinfo: 'none',
  })
  
  // Potential (Y) axis - Blue
  walls.push({
    x: [0, 0],
    y: [0, 2.1],
    z: [0, 0],
    mode: 'lines',
    type: 'scatter3d',
    line: {
      color: '#3b82f6',
      width: 8
    },
    showlegend: false,
    hoverinfo: 'none',
  })
  
  // Engagement (Z) axis - Green
  walls.push({
    x: [0, 0],
    y: [0, 0],
    z: [0, 2.1],
    mode: 'lines',
    type: 'scatter3d',
    line: {
      color: '#10b981',
      width: 8
    },
    showlegend: false,
    hoverinfo: 'none',
  })
  
  return walls
}

// Create grid lines for the cube
const createGridLines = () => {
  const gridLines = []
  
  // Create grid lines for each dimension
  for (let i = 0; i <= 2; i++) {
    for (let j = 0; j <= 2; j++) {
      // Lines along performance axis
      gridLines.push({
        type: 'scatter3d',
        mode: 'lines',
        x: [0, 2],
        y: [i, i],
        z: [j, j],
        line: { color: 'rgba(200, 200, 200, 0.5)', width: 1 },
        showlegend: false,
        hoverinfo: 'none',
      })
      
      // Lines along potential axis
      gridLines.push({
        type: 'scatter3d',
        mode: 'lines',
        x: [i, i],
        y: [0, 2],
        z: [j, j],
        line: { color: 'rgba(200, 200, 200, 0.5)', width: 1 },
        showlegend: false,
        hoverinfo: 'none',
      })
      
      // Lines along engagement axis
      gridLines.push({
        type: 'scatter3d',
        mode: 'lines',
        x: [i, i],
        y: [j, j],
        z: [0, 2],
        line: { color: 'rgba(200, 200, 200, 0.5)', width: 1 },
        showlegend: false,
        hoverinfo: 'none',
      })
    }
  }
  
  // Additional border lines for the cube
  // Bottom face
  gridLines.push({
    type: 'scatter3d',
    mode: 'lines',
    x: [0, 2, 2, 0, 0],
    y: [0, 0, 2, 2, 0],
    z: [0, 0, 0, 0, 0],
    line: { color: 'rgba(150, 150, 150, 0.8)', width: 2 },
    showlegend: false,
    hoverinfo: 'none',
  })
  
  // Top face
  gridLines.push({
    type: 'scatter3d',
    mode: 'lines',
    x: [0, 2, 2, 0, 0],
    y: [0, 0, 2, 2, 0],
    z: [2, 2, 2, 2, 2],
    line: { color: 'rgba(150, 150, 150, 0.8)', width: 2 },
    showlegend: false,
    hoverinfo: 'none',
  })
  
  // Vertical edges
  for (let i = 0; i <= 2; i += 2) {
    for (let j = 0; j <= 2; j += 2) {
      gridLines.push({
        type: 'scatter3d',
        mode: 'lines',
        x: [i, i],
        y: [j, j],
        z: [0, 2],
        line: { color: 'rgba(150, 150, 150, 0.8)', width: 2 },
        showlegend: false,
        hoverinfo: 'none',
      })
    }
  }
  
  return gridLines
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
  createPlot()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  if (chartContainer.value) {
    Plotly.purge(chartContainer.value)
  }
})

watch(() => [props.performance, props.potential, props.engagement], () => {
  createPlot()
})
</script>

<script lang="ts">
export default {
  name: 'ThreeByThreeByThreeChart'
}
</script> 