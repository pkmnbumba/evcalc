import math

ONE = 1
pwr1 = 9
pwr2 = 10

def findEVs(evs, total):
    return math.floor(total/evs)*evs

def isTrue(string):
    return string == "True"

EV = int(input('Desired EVs: '))
hasPkrs = isTrue(input('Has Pokerus? (True or False) '))
pwrItem = isTrue(input('Using Power Items? (True or False) '))
indEV = 1
noPwrItem = 1
if(pwrItem == True):
    indEV = ONE+8

if(hasPkrs == True):
    indEV = indEV*2
    noPwrItem *= 2

chain = 2
numChain = 1
totalEVs = 0
while (EV != 0):
    chainSize = 0
    if (EV >= indEV*chain and pwrItem == True):
        train = findEVs(indEV*chain, EV)
        numKills = math.floor(EV/indEV/chain)
        print ("For battle %s, kill %s Pokemon (w/ power item + SOS)" % (numChain, numKills))
    elif (EV >= indEV and pwrItem == True):
        train = findEVs(indEV, EV)
        print ("For battle %s, kill 1 Pokemon (w/ power item)" % numChain)
    elif (EV >= noPwrItem*chain):
        train = findEVs(noPwrItem*chain, EV)
        numKills = math.floor(EV/noPwrItem/chain)
        print ("For battle %s, kill %s Pokemon (no power item + SOS)" % (numChain, numKills))
    else:
        train = findEVs(noPwrItem, EV)
        print ("For battle %s, kill 1 Pokemon (no power item)" % numChain)
    totalEVs += train
    print ("Total EVs so far: %s" % int(totalEVs))
    EV = EV - train
    numChain += 1
