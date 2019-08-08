<template>
  <v-container fluid pl-0 pr-0>
    <v-data-table
      :headers="headers"
      :items="hotDogs"
      sort-by="calories"
    >
      <template v-slot:top>
        <v-toolbar
          flat
          color="white"
        >
          <v-toolbar-title>My CRUD</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          />
          <v-spacer />
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template v-slot:activator="{ on }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-on="on"
              >
                New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                      <v-text-field
                        v-model="editedItem.name"
                        label="Dessert name"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field
                        v-model="editedItem.calories"
                        label="Calories"
                      />
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field
                        v-model="editedItem.fat"
                        label="Fat (g)"
                      />
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          edit
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="getHotDogs"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: 'HotDogs',
  data: () => ({
    dialog: false,
    headers: [
      {
        text: 'Dessert (100g serving)',
        align: 'left',
        value: 'additive'
      },
      { text: 'Calories', value: 'bun' },
      { text: 'Fat (g)', value: 'ketchup' },
      { text: 'Carbs (g)', value: 'mustard' },
      { text: 'Protein (g)', value: 'sausage' },
      { text: 'Actions', value: 'action', sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      additive: '',
      bun: '',
      ketchup: '',
      mustard: '',
      sausage: ''
    },
    defaultItem: {
      additive: '',
      bun: '',
      ketchup: '',
      mustard: '',
      sausage: ''
    }
  }),
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
    hotDogs () {
      return this.$store.getters['hotDogs/getHotDogs']
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  created () {
    this.getHotDogs()
  },
  methods: {
    getHotDogs () {
      this.$store.dispatch('hotDogs/getHotDogs')
    },
    editItem (item) {
      this.editedIndex = this.hotDogs.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      const index = this.hotDogs.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.hotDogs.splice(index, 1)
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.hotDogs[this.editedIndex], this.editedItem)
      } else {
        this.hotDogs.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
