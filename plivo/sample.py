import plivo

client = plivo.RestClient('MAOTHIODFMOWUTZMFLZS', 'MTEzMjI5Y2EtNTkxOS00ZDBjLWE2YjItNTM3MGYy')
# response = client.calls.list(
#     limit=5,
#     offset=0, )

# print(response)

# response = client.calls.create(
#     from_='+919398152092',
#     to_='+918074403180',
#     answer_url='https://s3.amazonaws.com/static.plivo.com/answer.xml',
#     answer_method='GET', )

response = client.live_calls.list_ids(from_number='+919398152092', to_number='+918074403180')

print(response)

# response = client.calls.play(
#     call_uuid='85857506-2f77-4643-b507-674b19c4fbaa',
#     urls='https://s3.amazonaws.com/plivocloud/music.mp3', )