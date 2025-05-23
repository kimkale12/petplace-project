<template>
  <div class="reservation-ui">
    <!-- 객실명 -->
    <h2 class="room-title">{{ room.name }}</h2>

    <!-- 이미지 -->
    <img :src="room.image" :alt="room.name" class="room-image" />

    <!-- 상세 설명 -->
    <p class="room-description">{{ room.longDescription }}</p>

    <!-- 날짜 선택 -->
    <div class="date-select">
      <label>체크인 날짜</label>
      <input type="date" v-model="checkInDate" />
      <label>체크아웃 날짜</label>
      <input type="date" v-model="checkOutDate" />
    </div>

    <!-- 가격 및 예약 버튼 -->
    <div class="reservation-footer">
      <p class="total-price">총 금액: {{ totalPrice.toLocaleString() }}원</p>
      <button @click="reserveRoom" :disabled="!canReserve" class="reserve-button">
        예약하기
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { differenceInDays, parseISO } from 'date-fns'

const props = defineProps({
  room: Object
})

const checkInDate = ref('')
const checkOutDate = ref('')

const totalDays = computed(() => {
  if (!checkInDate.value || !checkOutDate.value) return 0
  return differenceInDays(parseISO(checkOutDate.value), parseISO(checkInDate.value)) || 0
})

const totalPrice = computed(() => props.room.price * totalDays.value)

const canReserve = computed(() => totalDays.value > 0)

const reserveRoom = () => {
  if (!canReserve.value) return
  alert(`예약 완료: ${props.room.name}\n${checkInDate.value} ~ ${checkOutDate.value}\n총 ${totalDays.value}일, ${totalPrice.value.toLocaleString()}원`)
  // 실제로는 API 요청 코드가 여기에 들어갑니다
}



const defaultRoom = {
  name: '스탠다드 룸',
  image: '/assets/images/room1.jpg',
  longDescription: '테스트용 객실 설명입니다.',
  price: 50000
}

const room = props.room || defaultRoom
</script>

<style scoped>
.reservation-ui {
  max-width: 500px;
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  font-family: 'Noto Sans KR', sans-serif;
}
.room-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
.room-image {
  width: 100%;
  border-radius: 12px;
  object-fit: cover;
  height: 220px;
  margin-bottom: 1rem;
}
.room-description {
  font-size: 0.95rem;
  white-space: pre-line;
  margin-bottom: 1.5rem;
  color: #444;
}
.date-select label {
  display: block;
  margin-bottom: 0.3rem;
  font-weight: 500;
}
.date-select input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}
.reservation-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}
.total-price {
  font-weight: bold;
  font-size: 1rem;
  color: #2e8b57;
}
.reserve-button {
  background-color: #22c55e;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}
.reserve-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.reserve-button:hover:enabled {
  background-color: #16a34a;
}
</style> 