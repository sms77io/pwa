export const send = {
    clear: 'Clear',
    dateTime: 'Date/Time',
    emoji: 'Emoji',
    error: {
        pre: 'Error(s) while sending:',
        sent: 'An error occured while sending SMS to "{{to}}": {{error}}',
    },
    h1: 'Send SMS',
    helperText: 'This defines the actual SMS content.',
    label: 'Message Content',
    onePlusNumberContact: 'One or more number(s) and/or contact(s) separated by comma e.g. +4901234567890,Peter',
    onePlusRecipient: 'Recipient(s)',
    send: 'Send',
    senderIdentifier: 'Sender Identifier',
    success: {
        msg: {
            error: {
                line_1: '#{{id}} failed sending to {{recipient}}',
                line_2: ' from {{sender}} with encoding {{sender}}: {{encoding}}',
            },
            success: {
                line_1: '#{{id}} {{parts}}x valued at',
                line_2: ' {{price}} sent to {{recipient}} from {{sender}}: {{text}}',
            },
        },
        text: '{{messageCount}} {{smsType}} SMS sent valued at {{totalPrice}} €. Balance: {{balance}}',
    },
    toolbar: {
        date: 'Date',
        label: 'Message Utilities Button Group',
        locale: 'Locale',
        time: 'Time',
        timestamp: 'Timestamp',
    },
};