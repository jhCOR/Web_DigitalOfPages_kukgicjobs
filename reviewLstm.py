def sentiment_predict(new_sentence):
  new_sentence = new_sentence.split(' ')
  new_sentence = [word for word in new_sentence if not word in stopwords] 
  encoded = tokenizer.texts_to_sequences([new_sentence])
  pad_new = pad_sequences(encoded, maxlen = max_len)
  score = float(loaded_model.predict(pad_new))
  if(score > 0.5):
    print("{:.2f}% 확률로 긍정 리뷰입니다.\n".format(score * 100))
  else:
    print("{:.2f}% 확률로 부정 리뷰입니다.\n".format((1 - score) * 100))
for sentence in new_sentence
    sentiment_predict('sentence')

#https://wikidocs.net/44249