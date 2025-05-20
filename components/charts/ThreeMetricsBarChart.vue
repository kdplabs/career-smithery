<template>
  <div ref="chartContainer" class="w-full h-96"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import Plotly from 'plotly.js-dist-min'

const props = defineProps<{
  performance: 'Low' | 'Medium' | 'High'
  potential: 'Low' | 'Medium' | 'High'
  engagement: 'Low' | 'Medium' | 'High'
}>()

const chartContainer = ref<HTMLElement | null>(null)

// Map string values to numeric values (1-3 scale)
const valueToNumeric = (value: string): number => {
  const values = { 'Low': 1, 'Medium': 2, 'High': 3 }
  return values[value as keyof typeof values]
}

// Get background color for bar based on value
const getBarColor = (value: string): string => {
  const colors = {
    'Low': 'rgba(239, 68, 68, 0.7)', // Red
    'Medium': 'rgba(249, 115, 22, 0.7)', // Orange
    'High': 'rgba(16, 185, 129, 0.7)', // Green
  }
  return colors[value as keyof typeof colors]
}

// Get border color for bar based on value
const getBorderColor = (value: string): string => {
  const colors = {
    'Low': 'rgb(220, 38, 38)', // Darker red
    'Medium': 'rgb(234, 88, 12)', // Darker orange
    'High': 'rgb(5, 150, 105)', // Darker green
  }
  return colors[value as keyof typeof colors]
}

// Create the bar chart
const createChart = () => {
  if (!chartContainer.value) return

  // Clear existing plot
  Plotly.purge(chartContainer.value)

  // Convert the props to numeric values (1-3 scale)
  const performanceValue = valueToNumeric(props.performance)
  const potentialValue = valueToNumeric(props.potential)
  const engagementValue = valueToNumeric(props.engagement)

  // Create data traces for each metric
  const performanceBar = {
    x: ['Performance'],
    y: [performanceValue],
    name: 'Performance',
    type: 'bar',
    text: [props.performance],
    textposition: 'auto',
    hoverinfo: 'text',
    hovertext: [`Performance: ${props.performance}`],
    marker: {
      color: getBarColor(props.performance),
      line: {
        color: getBorderColor(props.performance),
        width: 1.5
      }
    }
  }

  const potentialBar = {
    x: ['Potential'],
    y: [potentialValue],
    name: 'Potential',
    type: 'bar',
    text: [props.potential],
    textposition: 'auto',
    hoverinfo: 'text',
    hovertext: [`Potential: ${props.potential}`],
    marker: {
      color: getBarColor(props.potential),
      line: {
        color: getBorderColor(props.potential),
        width: 1.5
      }
    }
  }

  const engagementBar = {
    x: ['Engagement'],
    y: [engagementValue],
    name: 'Engagement',
    type: 'bar',
    text: [props.engagement],
    textposition: 'auto',
    hoverinfo: 'text',
    hovertext: [`Engagement: ${props.engagement}`],
    marker: {
      color: getBarColor(props.engagement),
      line: {
        color: getBorderColor(props.engagement),
        width: 1.5
      }
    }
  }

  // Draw reference lines for Low, Medium, and High
  const lowLine = {
    x: ['Performance', 'Potential', 'Engagement'],
    y: [1, 1, 1],
    mode: 'lines',
    type: 'scatter',
    name: 'Low',
    line: {
      color: 'rgba(156, 163, 175, 0.5)',
      width: 1,
      dash: 'dash',
    },
    hoverinfo: 'name',
    showlegend: false
  }

  const mediumLine = {
    x: ['Performance', 'Potential', 'Engagement'],
    y: [2, 2, 2],
    mode: 'lines',
    type: 'scatter',
    name: 'Medium',
    line: {
      color: 'rgba(156, 163, 175, 0.5)',
      width: 1,
      dash: 'dash',
    },
    hoverinfo: 'name',
    showlegend: false
  }

  const highLine = {
    x: ['Performance', 'Potential', 'Engagement'],
    y: [3, 3, 3],
    mode: 'lines',
    type: 'scatter',
    name: 'High',
    line: {
      color: 'rgba(156, 163, 175, 0.5)',
      width: 1,
      dash: 'dash',
    },
    hoverinfo: 'name',
    showlegend: false
  }

  // Layout configuration
  const layout = {
    autosize: true,
    height: chartContainer.value.clientHeight,
    width: chartContainer.value.clientWidth,
    margin: {
      l: 40,
      r: 40,
      b: 40,
      t: 20,
    },
    xaxis: {
      tickfont: {
        size: 14,
        color: '#333',
      },
    },
    yaxis: {
      title: 'Rating',
      tickvals: [1, 2, 3],
      ticktext: ['Low', 'Medium', 'High'],
      range: [0, 3.5],
      tickfont: {
        size: 12,
      },
      gridcolor: 'rgba(230, 230, 230, 0.5)',
    },
    barmode: 'group',
    bargap: 0.3,
    bargroupgap: 0.1,
    showlegend: false,
    plot_bgcolor: 'rgba(250, 250, 250, 0.8)',
    paper_bgcolor: 'rgba(250, 250, 250, 0)',
    hovermode: 'closest',
    annotations: []
  }

  // Create the plot
  Plotly.newPlot(
    chartContainer.value,
    [lowLine, mediumLine, highLine, performanceBar, potentialBar, engagementBar],
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
  name: 'ThreeMetricsBarChart'
}
</script> 