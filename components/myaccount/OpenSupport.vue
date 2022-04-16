<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
	<div class="open_support-right-section myac-right-section">
		<div class="page-title-wrapper">
			<h1 class="page-title"><span>Open Support</span></h1>
		</div>
    <span class="error-bg" v-if="openSupportsError!=null">
      {{openSupportsError}}
    </span>
    <span class="success-bg" v-if="openSupportsSuccess!=null">
      {{openSupportsSuccess}}
    </span>

		<div class="Open_support-container">
			<div class="open_support-form">
				<div class="form-control_os">
					<div class="input-group title-group">
						<label for="title" class="label">Title</label>
						<div class="control">
							<input
                id="title"
                type="text"
                name="title"
                class="input-text input-title"
                v-model="title"
              />
              <span class="error" v-if="titleError!=null">
                {{titleError}}
              </span>
						</div>
					</div>
					<div class="input-group textarea-group">
						<label for="description" class="label">Description</label>
						<div class="control">
							<textarea id="description" class="input-text input-textarea" v-model="description">
              </textarea>
              <span class="error" v-if="descriptionError!=null">
                {{descriptionError}}
              </span>
						</div>
					</div>
           <div class="two-files">

              <div class="topics dropdown-box">
                <label for="topic" class="label">Topic</label>
                <div class="dropdown-control">
                  <select class="select-dropdown" v-model="topic">
                      <option v-for="topic in openSupportsTopicOptions" :value="topic.value" :key="topic.value"> 
                        {{topic.label}} 
                      </option>
                    </select>
                  <span class="error" v-if="topicError!=null">
                    {{topicError}}
                  </span>
                </div>
              </div>
            
              <div class="Order dropdown-box">
                <label for="topic" class="label">Order</label>
                <div class="dropdown-control">
                  <select class="select-dropdown" v-model="order"> 
                      <option v-for="order in orders.items" :value="order.number" :key="order.number" > 
                        {{order.number}} </option>
                    </select>
                </div>
              </div>
              
           </div> 

					<div class="form-action Send_btn">
						<button type="button" class="submit" @click="createNewOpenSupport()">Send</button>
					</div>
				</div>
				<div
          class="table-container"
          v-if="Object.keys(openSupports).length > 0 && openSupports.tickets.length > 0"
        >
					<table id="Product-Review" class="table-wrapper">
						<thead class="">
							<tr class="row-th">
								<th class="th-title">Title</th>
								<th class="th-description">Description</th>
								<!-- <th class="th-description">Topic</th> -->
								<th class="th-date">Date</th>
								<th class="th-status">Status</th>
							</tr>
						</thead>

						<tbody class="product-review-body item-body">
							<tr
                class="item-info"
                v-for="(ticket, index) in openSupports.tickets"
                :key="index"
              >
								<td data-label="Title" class="title-td">
									<div class="item-wrapper">
										<div class="about-item">
											<span class="review-date item-info-td">{{ ticket.title }}</span>
										</div>
									</div>
								</td>
								<td class="description-td" data-label="Description">
									<span class="item-description item-info-td">
										{{ ticket.description }}
									</span>
								</td>
								<!-- <td class="topic-td" data-label="Topic">
									<span class="item-topic item-info-td">
										{{ ticket.topic }}
									</span>
								</td> -->
								<td class="date-td" data-label="Date">
									<span class="rating-item item-info-td">
										{{ ticket.creation_date }}
									</span>
								</td>
								<td class="Status-td" data-label="Status">
									<span class="item-review item-info-td" v-if="ticket.answer == null">
										Waiting for an answer
									</span>
                  <span class="item-review item-info-td" v-else>
										{{ ticket.answer }}
									</span>
								</td>
							</tr>

						</tbody>
					</table>
				</div>

        <Pagination
          ref="pagination"
          v-if="Object.keys(openSupports).length > 0 && openSupports.tickets.length > 0"
          :currentPage="openSupports.page_info.current_page"
          :totalPage="openSupports.page_info.total_pages"
          @updateCurrentPage="updateCurrentPageAction"
        />
			</div>
		</div>
	</div>
</template>

<script>
import Pagination from "~/components/partials/Pagination.vue";
import openSupportMixin from "~/mixins/others/openSupport.js";
import salesMixin from "~/mixins/sales.js";
export default {
  name: "OpenSupport",
  mixins: [openSupportMixin, salesMixin],
  components: {
    Pagination
  },
  data() {
    return {
      title: '',
      description: '',
      topic: '',
      order:'',

      titleError: null,
      descriptionError: null,
      topicError: null,
    }
  },
  mounted(){
    if(this.$route.query.order) {
      this.order = this.$route.query.order
    }
  },
  methods: {
    resetError() {
      this.titleError = null
      this.descriptionError = null
      this.topicError = null
    },

    checkValidation() {
      let validation = false
      this.resetError()

      if(this.title == '') {
        this.titleError = 'Title is required.'
        validation = true
      }

      if(this.description == '') {
        this.descriptionError = 'Description is required.'
        validation = true
      }

      if(this.topic == '') {
        this.topicError = 'Topic is required.'
        validation = true
      }

      return validation
    },

    async createNewOpenSupport() {
      if(!this.checkValidation()){
        let payload = {
          title: this.title,
          description: this.description,
          topic: this.topic,
          order: this.order,
          currentPage: this.openSupports.page_info.current_page,
          pageSize: this.openSupports.page_info.page_size
        }
       
        await this.createNewOpenSupports(payload)
      }
    },

    async updateCurrentPageAction(currentPage){
      await this.getOpenSupports({
        currentPage: currentPage,
        pageSize: this.openSupports.page_info.page_size
      })
    }
  }
};
</script>
