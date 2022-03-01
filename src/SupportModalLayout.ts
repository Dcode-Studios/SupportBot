export default [{
    type: 1,
    components: [{
        type: 4,
        custom_id: 'question1',
        style: 1,
        label: 'Short topic for this ticket',
        placeholder: 'Example: Linking Servers',
        max_length: 60,
        required: true
    }]
}, {
    type: 1,
    components: [{
        type: 4,
        custom_id: 'question2',
        style: 1,
        label: 'Server ID',
        placeholder: 'Example: 756363194238369813',
        required: false
    }]
}, {
    type: 1,
    components: [{
        type: 4,
        custom_id: 'question3',
        style: 1,
        label: 'Describe in detail what you need help with',
        placeholder: 'Example: Well, I need to add xxxxxx to sync with xxxxxx',
        required: true
    }]
}]