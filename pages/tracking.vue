<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
    <div class="main">
        <div class="container">
            <div class="tracking-page">
                <Tracking />
            </div>
        </div>
    </div>
</template>
<script>
    import Tracking from "~/components/checkout/Tracking.vue";
    export default {
        name: "TrackingPage",
        layout: "checkout",
        components: {
            Tracking
        }
    };
</script>
