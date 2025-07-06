<template>
  <svg width="180" height="100" viewBox="0 0 180 100">
    <path d="M20,90 A70,70 0 0,1 160,90" fill="none" stroke="#e5e7eb" stroke-width="18" />
    <path :d="gaugeArc" fill="none" stroke="#6366f1" stroke-width="18" />
    <circle :cx="needleX" :cy="needleY" r="7" fill="#6366f1" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  score: { type: Number, required: true }
})
// Clamp score between 0 and 100
const safeScore = computed(() => Math.max(0, Math.min(100, props.score || 0)))
// Map score 0-100 to angle 180 (left) to 0 (right)
const angle = computed(() => 180 - (safeScore.value * 180) / 100)
const gaugeArc = computed(() => {
  const r = 70
  const cx = 90, cy = 90
  const startAngle = Math.PI // 180°
  const endAngle = (Math.PI * angle.value) / 180
  const start = { x: cx + r * Math.cos(startAngle), y: cy + r * Math.sin(startAngle) }
  const end = { x: cx + r * Math.cos(endAngle), y: cy + r * Math.sin(endAngle) }
  const largeArc = safeScore.value > 50 ? 1 : 0
  return `M${start.x},${start.y} A${r},${r} 0 ${largeArc},1 ${end.x},${end.y}`
})
const needleX = computed(() => {
  const r = 60
  const angleRad = (Math.PI * angle.value) / 180
  return 90 + r * Math.cos(angleRad)
})
const needleY = computed(() => {
  const r = 60
  const angleRad = (Math.PI * angle.value) / 180
  return 90 + r * Math.sin(angleRad)
})
</script> 