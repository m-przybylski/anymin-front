export function ConsultationsFieldController() {

  this.tags = [{
    name: 'tag1'
  }, {
    name: 'tag2'
  }]

  this.controlls = {}

  this.nextSlide = () => {
    this.controlls.nextSlide()
  }

  this.prevSlide = () => {
    this.controlls.prevSlide()
  }

  this.expertCard = [
    {
      id: '0',
      value: {
        name: '1 Slide',
        status: 'not-available',
        avatar: 'https://placekitten.com/50/50',
        description: 'Układanie planów żywieniowych dla osób na diecie wegetariańskiej'
      }
    },
    {
      id: '1',
      value: {
        name: '2 Slide',
        status: 'not-available',
        avatar: 'https://placekitten.com/50/50',
        description: 'Układanie planów żywieniowych dla osób na diecie wegetariańskiej'
      }
    },
    {
      id: '2',
      value: {
        name: '3 Slide',
        status: 'not-available',
        avatar: 'https://placekitten.com/50/50',
        description: 'Układanie planów żywieniowych dla osób na diecie wegetariańskiej'
      }
    },
    {
      id: '3',
      value: {
        name: '4 Slide',
        status: 'not-available',
        avatar: 'https://placekitten.com/50/50',
        description: 'Układanie planów żywieniowych dla osób na diecie wegetariańskiej'
      }
    },
    {
      id: '4',
      value: {
        name: '5 Slide',
        status: 'available',
        avatar: 'https://placekitten.com/50/50',
        description: 'Układanie planów żywieniowych dla osób na diecie wegetariańskiej'
      }
    },
    {
      id: '5',
      value: {
        name: '6 Slide',
        status: 'not-available',
        avatar: 'https://placekitten.com/50/50',
        description: 'Układanie planów żywieniowych dla osób na diecie wegetariańskiej'
      }
    },
    {
      id: '6',
      value: {
        name: '7 Slide',
        status: 'not-available',
        avatar: 'https://placekitten.com/50/50',
        description: 'Układanie planów żywieniowych dla osób na diecie wegetariańskiej'
      }
    },
    {
      id: '7',
      value: {
        name: '8 Slide',
        status: 'not-available',
        avatar: 'https://placekitten.com/50/50',
        description: 'Układanie planów żywieniowych dla osób na diecie wegetariańskiej'
      }
    },
    {
      id: '8',
      value: {
        name: '9 Slide',
        status: 'available',
        avatar: 'https://placekitten.com/50/50',
        description: 'Układanie planów żywieniowych dla osób na diecie wegetariańskiej'
      }
    },
    {
      id: '9',
      value: {
        name: '10 Slide',
        status: 'available',
        avatar: 'https://placekitten.com/50/50',
        description: 'Układanie planów żywieniowych dla osób na diecie wegetariańskiej'
      }
    }
  ]
  return this
}
