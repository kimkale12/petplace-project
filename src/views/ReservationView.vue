<template>
  <div class="reservation-modal-overlay" @click="onOverlayClick">
    <div class="reservation-modal" @click.stop>
      <button class="modal-close" @click="closeModal">×</button>
      <div class="reservation-ui">
        <!-- 객실명 (토글) -->
        <h2 class="room-title" @click="toggleRoom" style="cursor:pointer;">
          {{ currentRoom.name }}
        </h2>
        <!-- 이미지 -->
        <img :src="currentRoom.image" :alt="currentRoom.name" class="room-image" />
        <!-- 상세 설명 -->
        <p class="room-description">{{ currentRoom.longDescription }}</p>
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
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { differenceInDays, parseISO } from 'date-fns'

const route = useRoute()
const router = useRouter()

const roomList = [
  {
    name: '스탠다드 룸',
    image: '/assets/images/room1.jpg',
    longDescription: '테스트용 객실 설명입니다.',
    price: 50000
  },
  {
    name: '디럭스 룸',
    image: '/assets/images/room2.jpg',
    longDescription: '디럭스룸 설명입니다.',
    price: 80000
  },
  {
    name: '스위트 룸',
    image: '/assets/images/room3.jpg',
    longDescription: '스위트룸 설명입니다.',
    price: 120000
  }
]

// 쿼리스트링에서 초기값 세팅
const initialRoomIdx = (() => {
  const name = route.query.name
  if (!name) return 0
  return roomList.findIndex(r => r.name === name) !== -1 ? roomList.findIndex(r => r.name === name) : 0
})()

const currentRoomIdx = ref(initialRoomIdx)
const currentRoom = computed(() => roomList[currentRoomIdx.value])

const checkInDate = ref('')
const checkOutDate = ref('')

const totalDays = computed(() => {
  if (!checkInDate.value || !checkOutDate.value) return 0
  return differenceInDays(parseISO(checkOutDate.value), parseISO(checkInDate.value)) || 0
})

const totalPrice = computed(() => currentRoom.value.price * totalDays.value)

const canReserve = computed(() => totalDays.value > 0)

const isLoggedIn = localStorage.getItem('isLoggedIn') === 'false'
const isLoggedOut = !isLoggedIn

const reserveRoom = () => {
  if (!canReserve.value) return;
  if (isLoggedOut) {
    alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
    closeModal();
    router.push('/login');
    return;
  }
  alert(`예약 완료: ${currentRoom.value.name}\n${checkInDate.value} ~ ${checkOutDate.value}\n총 ${totalDays.value}일, ${totalPrice.value.toLocaleString()}원`);
  // 실제로는 API 요청 코드가 여기에 들어갑니다
}

function closeModal() {
  router.back()
}

function toggleRoom() {
  currentRoomIdx.value = (currentRoomIdx.value + 1) % roomList.length
}

function onOverlayClick() {
  closeModal()
}
</script>

<style scoped>
.reservation-modal-overlay {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.reservation-modal {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.18);
  padding: 0;
  max-width: 540px;
  width: 95vw;
  position: relative;
  animation: modal-fadein 0.2s;
  max-height: 90vh;
  overflow-y: auto;
}
@keyframes modal-fadein {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
.modal-close {
  position: absolute;
  right: 18px;
  top: 14px;
  font-size: 2rem;
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  z-index: 10;
  transition: color 0.2s;
}
.modal-close:hover {
  color: #e53935;
}
.reservation-ui {
  max-width: 500px;
  background: #fff;
  border-radius: 16px;
  padding: 24px 24px 18px 24px;
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