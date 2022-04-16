<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="review-rating">
    <div class="control review-control-vote">
      <div class="rating-group">
        <label aria-label="1 star" class="rating__label" :for="id+'-1'">
          <i class="rating__icon rating__icon--star fa fa-star"></i>
        </label>
        <input class="rating__input" :name="id" :id="id+'-1'" :value="dataValue[0]" type="radio" @change="checkedValue($event, id)">

        <label aria-label="2 stars" class="rating__label" :for="id+'-2'">
          <i class="rating__icon rating__icon--star fa fa-star"></i>
        </label>
        <input class="rating__input" :name="id" :id="id+'-2'" :value="dataValue[1]" type="radio" @change="checkedValue($event, id)">

        <label aria-label="3 stars" class="rating__label" :for="id+'-3'">
          <i class="rating__icon rating__icon--star fa fa-star"></i>
        </label>
        <input class="rating__input" :name="id" :id="id+'-3'" :value="dataValue[2]" type="radio" @change="checkedValue($event, id)">

        <label aria-label="4 stars" class="rating__label" :for="id+'-4'">
          <i class="rating__icon rating__icon--star fa fa-star"></i>
        </label>
        <input class="rating__input" :name="id" :id="id+'-4'" :value="dataValue[3]" type="radio" @change="checkedValue($event, id)">

        <label aria-label="5 stars" class="rating__label" :for="id+'-5'">
          <i class="rating__icon rating__icon--star fa fa-star"></i>
        </label>
        <input class="rating__input" :name="id" :id="id+'-5'" :value="dataValue[4]" type="radio" @change="checkedValue($event, id)">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "StarRating",
  props: ['id', 'dataValue'],
  methods: {
    checkedValue(event, id){
      this.$emit('updateStarRating', {
        id: id,
        value: event.target.value
      })
    }
  }
};
</script>


