5 CLS
10 SPHERES=2:IF SPHERES THEN DIM C(SPHERES,3):DIM R(SPHERES):DIM Q(SPHERES)
20 FOR K=1 TO SPHERES:READ C(K,1),C(K,2),C(K,3),R:R(K)=R:Q(K)=R*R:NEXT K
30 DATA -0.3,-0.8,3,0.6
40 DATA 0.9,-1.1,2,0.2

50 FOR I=0 TO 191:FOR J=0 TO 255
60 X=0.3:Y=-0.5:Z=0
70 DX=J-128:DY=96-I:DZ=300:DD=DX*DX+DY*DY+DZ*DZ
80 GOSUB 100:NEXT J:NEXT I

90 GOTO 90

100 N=Y>=0 OR DY<=0:IF NOT N THEN S=-Y/DY
110 FOR K=1 TO SPHERES
120 PX=C(K,1)-X:PY=C(K,2)-Y:PZ=C(K,3)-Z
130 PP=PX*PX+PY*PY+PZ*PZ
140 SC=PX*DX+PY*DY+PZ*DZ
150 IF SC<=0 THEN GOTO 200
160 BB=SC*SC/DD
170 AA=Q(K)-PP+BB
180 IF AA<=0 THEN GOTO 200
190 SC=(SQR(BB)-SQR(AA))/SQR(DD):IF SC<S OR N<0 THEN N=K:S=SC
200 NEXT K

210 IF N<0 THEN RETURN

220 DX=DX*S:DY=DY*S:DZ=DZ*S:DD=DD*S*S
230 X=X+DX:Y=Y+DY:Z=Z+DZ
240 IF N=0 THEN GOTO 300
250 NX=X-C(N,1):NY=Y-C(N,2):NZ=Z-C(N,3)
260 NN=NX*NX+NY*NY+NZ*NZ
270 L=2*(DX*NX+DY*NY+DZ*NZ)/NN
280 DX=DX-NX*L:DY=DY-NY*L:DZ=DZ-NZ*L
290 GOTO 100

300 FOR K=1 TO SPHERES
310 U=C(K,1)-X:V=C(K,3)-Z:IF U*U+V*V<=Q(K) THEN RETURN
320 NEXT K
330 IF (X-INT X>.5)<>(Z-INT Z>.5) THEN SET(J,I)
340 RETURN