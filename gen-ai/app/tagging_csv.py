import pandas as pd
import chardet

file = 'spam.csv'
with open(file, 'rb') as rawdata:
    result = chardet.detect(rawdata.read(100000))
print(result)

df = pd.read_csv(file, encoding='Windows-1252')
print(df.shape)
print(df.columns.tolist())

#print(df.head)

mydata = df[['v1','v2']]
print(mydata)
