Vue.component("region", {
    props: ["model", "content", "type"],
    methods: {
        moveItem: function (from, to) {
            this.model.items.splice(to, 0, this.model.items.splice(from, 1)[0])
        },
        addItem: function () {
            var self = this;

            fetch(piranha.baseUrl + "manager/api/content/region/" + this.content + "/" + this.type + "/" + this.model.meta.name)
                .then(function (response) { return response.json(); })
                .then(function (result) {
                    self.model.items.push(result);
                })
                .catch(function (error) { console.log("error:", error );
            });
        },
        removeItem: function (item) {
            this.model.items.splice(this.model.items.indexOf(item), 1);
        },
        updateTitle: function (e) {
            for (var n = 0; n < this.model.items.length; n++) {
                if (this.model.items[n].uid === e.uid) {
                    this.model.items[n].title = e.title;
                    break;
                }
            }
        },
    },
    mounted: function () {
        if (this.model.meta.isCollection)
        {
            var self = this;

            sortable("#" + this.model.meta.uid, {
                handle: '.card-header a:first-child',
                items: ":not(.unsortable)"
            })[0].addEventListener("sortupdate", function (e) {
                self.moveItem(e.detail.origin.index, e.detail.destination.index);
            });
        }
    },
    template:
        "<div class='row' v-if='!model.meta.isCollection'>" +
        "  <div class='col-sm-12' v-if='model.meta.description != null'>" +
        "    <div class='alert alert-info' v-html='model.meta.description'></div>" +
        "  </div>" +
        "  <div class='form-group' :class='{ \"col-sm-6\": field.meta.isHalfWidth, \"col-sm-12\": !field.meta.isHalfWidth }' v-for='field in model.items[0].fields'>" +
        "    <label v-if='model.items[0].fields.length > 1'>{{ field.meta.name }}</label>" +
        "    <div v-if='field.meta.description != null' v-html='field.meta.description' class='field-description small text-muted'></div>" +
        "    <component v-if='field.model != null' v-bind:is='field.meta.component' v-bind:uid='field.meta.uid' v-bind:meta='field.meta' v-bind:model='field.model'></component>" +
        "  </div>" +
        "</div>" +
        "<div v-else>" +
        "  <div v-if='model.meta.description != null'>" +
        "    <div class='alert alert-info' v-html='model.meta.description'></div>" +
        "  </div>" +
        "  <div :id='model.meta.uid' class='accordion sortable' :class='model.items.length !== 0 ? \"mb-3\" : \"\"'>" +
        "    <div class='card' :key='item.uid' v-for='(item, index) in model.items'>" +
        "      <div class='card-header'>" +
        "        <a href='#' data-toggle='collapse' :data-target='\"#body\" + item.uid'>" +
        "          <div class='handle'>" +
        "            <i class='fas fa-ellipsis-v'></i>" +
        "          </div>" +
        "          {{ item.title }}" +
        "        </a>" +
        "        <span class='actions float-right'>" +
        "          <a v-on:click.prevent='removeItem(item)' href='#' class='danger'><i class='fas fa-trash'></i></a>" +
        "        </span>" +
        "      </div>" +
        "      <div :id='\"body\" + item.uid' class='collapse' :data-parent='\"#\" + model.meta.uid'>" +
        "        <div class='card-body'>" +
        "          <div class='row'>" +
        "            <div class='form-group' :class='{ \"col-sm-6\": field.meta.isHalfWidth, \"col-sm-12\": !field.meta.isHalfWidth }' v-for='field in item.fields'>" +
        "              <label>{{ field.meta.name }}</label>" +
        "              <component v-if='field.model != null' v-bind:is='field.meta.component' v-bind:uid='item.uid' v-bind:meta='field.meta' v-bind:model='field.model' v-on:update-field='updateTitle($event)'></component>" +
        "            </div>" +
        "          </div>" +
        "        </div>" +
        "      </div>" +
        "    </div>" +
        "  </div>" +
        "  <a href='#' class='block-add' v-on:click.prevent='addItem()'>" +
        "    <hr>" +
        "    <i class='fas fa-plus-circle'></i>" +
        "  </a>" +
        "  <div v-if='model.items.length === 0' class='empty-info unsortable'>" +
        "    <p>{{ piranha.resources.texts.emptyAddAbove }}</p>" +
        "  </div>" +
        "</div>"
});
