( function () {
  var  MutationObserver , Util, WeakMap , getComputedStyle, getComputedStyleRX,
    bind  =  function ( fn , me ) { função return  () { return fn . aplicar (eu, argumentos ); }; } 
    indexOf = []. indexOf  ||  função ( produto ) { para ( var i =  0 , l =  este . comprimento ; i < l; i ++ ) { se (i em  este  &&  esta [i] === item) retorno i; } return  - 1 ; };

  Util = ( function () {
    função  util () {}

    Util . protótipo . extend  =  function ( custom , defaults ) {
      var chave, valor;
      for (key in defaults) {
        valor = padrões [chave];
        if (custom [chave] ==  null ) {
          custom [chave] = valor;
        }
      }
      retorno personalizado;
    };

    Util . protótipo . isMobile  =  function ( agent ) {
      retorno / Android | webOS | iPhone | iPad | iPod | BlackBerry | IEMobile | Opera Mini / i . teste (agente); 
    };

    Util . protótipo . createEvent  =  function ( event , bubble , cancel , detail ) {
      var customEvent;
      if (bubble ==  null ) {
        bolha =  falsa ;
      }
      if (cancel ==  null ) {
        cancel =  false ;
      }
      if (detalhe ==  null ) {
        detail =  null ;
      }
      if ( document . createEvent  ! =  null ) {
        customEvent =  documento . createEvent ( ' CustomEvent ' );
        customEvent . initCustomEvent ( evento , bolha, cancelamento, detalhe);
      } else  if ( document . createEventObject  ! =  null ) {
        customEvent =  documento . createEventObject ();
        customEvent . eventType  =  event ;
      } mais {
        customEvent . eventName  =  event ;
      }
      return customEvent;
    };

    Util . protótipo . emitEvent  =  function ( elem , event ) {
      if ( elem . dispatchEvent  ! =  null ) {
        return  elem . dispatchEvent ( evento );
      } else  if ( evento  em (elem ! =  null )) {
        return elem [ evento ] ();
      } else  if (( " on "  +  event ) em (elem ! =  null )) {
        return elem [ " on "  +  evento ] ();
      }
    };

    Util . protótipo . addEvent  =  function ( elem , event , fn ) {
      if ( elem . addEventListener  ! =  nulo ) {
        return  elem . addEventListener ( evento , fn, false );
      } else  if ( elem . attachEvent  ! =  null ) {
        return  elem . attachEvent ( " on "  +  event , fn);
      } mais {
        return elem [ evento ] = fn;
      }
    };

    Util . protótipo . removeEvent  =  function ( elem , event , fn ) {
      if ( elem . removeEventListener  ! =  nulo ) {
        return  elem . removeEventListener ( evento , fn, false );
      } else  if ( elem . detachEvent  ! =  null ) {
        return  elem . detachEvent ( " on "  +  event , fn);
      } mais {
        return  delete elem [ evento ];
      }
    };

    Util . protótipo . innerHeight  =  function () {
      if ( ' innerHeight '  na  janela ) {
         janela de retorno . innerHeight ;
      } mais {
        retornar  documento . documentElement . clientHeight ;
      }
    };

    return Util;

  }) ();

  WeakMap  =  isso . WeakMap  ||  isso . MozWeakMap  || ( WeakMap  = ( function () {
    função  WeakMap () {
      isso . keys  = [];
      isso . values  = [];
    }

    WeakMap . protótipo . get  =  function ( key ) {
      var i, item, j, len, ref;
      ref =  isso . chaves ;
      para (i = j =  0 , len =  ref . comprimento ; j < len; i =  ++ j) {
        item = ref [i];
        if (item === key) {
          devolva  isto . valores [i];
        }
      }
    };

    WeakMap . protótipo . set  =  function ( key , value ) {
      var i, item, j, len, ref;
      ref =  isso . chaves ;
      para (i = j =  0 , len =  ref . comprimento ; j < len; i =  ++ j) {
        item = ref [i];
        if (item === key) {
          isso . valores [i] = valor;
          retorno ;
        }
      }
      isso . chaves . empurre (tecla);
      devolva  isto . valores . push (valor);
    };

    return  WeakMap ;

  }) ());

  MutationObserver  =  isto . MutationObserver  ||  isso . WebkitMutationObserver  ||  isso . MozMutationObserver  || ( MutationObserver  = ( function () {
    function  MutationObserver () {
      if ( console typeof  ! == " indefinido " && console ! == null ) {      
        console . warn ( ' MutationObserver não é suportado pelo seu navegador. ' );
      }
      if ( console typeof  ! == " indefinido " && console ! == null ) {      
        console . warn ( ' WOW.js não pode detectar mutações no dom, por favor ligue para o .sync () depois de carregar o novo conteúdo. ' );
      }
    }

    MutationObserver . notSupported  =  true ;

    MutationObserver . protótipo . observe  =  function () {};

    return  MutationObserver ;

  }) ());

  getComputedStyle =  isto . getComputedStyle  ||  função ( el , pseudo ) {
    isso . getPropertyValue  =  function ( prop ) {
      var ref;
      if (prop ===  ' float ' ) {
        prop =  ' styleFloat ' ;
      }
      if ( getComputedStyleRX . test (prop)) {
        prop . substituir (getComputedStyleRX, function ( _ , _char ) {
          return  _char . toUpperCase ();
        });
      }
      return ((ref =  el . currentStyle ) ! =  null  ? ref [prop] :  void  0 ) ||  null ;
    };
    devolva  isto ;
  };

  getComputedStyleRX = / ( \ - ( [ az ] ) {1} ) / g ; 

  isso . WOW  = ( function () {
    WOW . protótipo . padrões  = {
      boxClass :  ' uau ' ,
      animateClass :  ' animado ' ,
      deslocamento :  0 ,
      celular :  verdadeiro ,
      viver :  verdade ,
      retorno de chamada :  null ,
      scrollContainer :  null
    };

    função  WOW ( opções ) {
      if (options ==  null ) {
        opções = {};
      }
      isso . scrollCallback  =  bind ( isso . scrollCallback , isso );
      isso . scrollHandler  =  bind ( this . scrollHandler , isso );
      isso . resetAnimation  =  bind ( isto . resetAnimation , isso );
      isso . start  =  bind ( isto . inicie , isto );
      isso . rolado  =  verdadeiro ;
      isso . config  =  this . util (). extend (opções, isto . padrões );
      if ( opções . scrollContainer  ! =  null ) {
        isso . config . scrollContainer  =  document . querySelector ( opções . scrollContainer );
      }
      isso . animationNameCache  =  novo  WeakMap ();
      isso . wowEvent  =  isso . util (). createEvent ( this . config . boxClass );
    }

    WOW . protótipo . init  =  function () {
      var ref;
      isso . elemento  =  janela . documento . documentElement ;
      if ((ref =  document . readyState ) ===  " interativo "  || ref ===  " completo " ) {
        isso . start ();
      } mais {
        isso . util (). addEvent ( document , ' DOMContentLoaded ' , this . start );
      }
      devolva  isto . finished  = [];
    };

    WOW . protótipo . start  =  function () {
      caixa var , j, len, ref;
      isso . parado  =  falso ;
      isso . boxes  = ( function () {
        var j, len, ref, resultados;
        ref =  isso . elemento . querySelectorAll ( " . "  +  this . config . boxClass );
        results = [];
        para (j =  0 , len =  ref . length ; j < len; j ++ ) {
          box = ref [j];
          resultados . empurre (caixa);
        }
        retornar resultados;
      }). chamar ( isso );
      isso . all  = ( function () {
        var j, len, ref, resultados;
        ref =  isso . caixas ;
        results = [];
        para (j =  0 , len =  ref . length ; j < len; j ++ ) {
          box = ref [j];
          resultados . empurre (caixa);
        }
        retornar resultados;
      }). chamar ( isso );
      if ( this . boxes . length ) {
        if ( this . disabled ()) {
          isso . resetStyle ();
        } mais {
          ref =  isso . caixas ;
          para (j =  0 , len =  ref . length ; j < len; j ++ ) {
            box = ref [j];
            isso . applyStyle (box, true );
          }
        }
      }
      if ( ! this . disabled ()) {
        isso . util (). addEvent ( this . config . scrollContainer  ||  janela , ' scroll ' , this . scrollHandler );
        isso . util (). addEvent ( janela , ' redimensionar ' , this . scrollHandler );
        isso . interval  =  setInterval ( isto . scrollCallback , 50 );
      }
      if ( this . config . live ) {
        return  new  MutationObserver (( função ( _this ) {
           função de retorno ( registros ) {
            var k, len1, nó, registro, resultados;
            results = [];
            para (k =  0 , len1 =  registros . comprimento ; k < len1; k ++ ) {
              registro = registros [k];
              resultados . push (( function () {
                var l, len2, ref1, results1;
                ref1 =  registro . addedNodes  || [];
                results1 = [];
                para (l =  0 , len2 =  ref1 . length ; l < len2; l ++ ) {
                  nó = ref1 [l];
                  results1 . push ( isso . doSync (nó));
                }
                retornar resultados1;
              }). chamar (_this));
            }
            retornar resultados;
          };
        }) ( isto )). observe ( documento . corpo , {
          defilhos :  verdade ,
          subárvore :  verdadeiro
        });
      }
    };

    WOW . protótipo . stop  =  function () {
      isso . parado  =  verdadeiro ;
      isso . util (). removeEvent ( this . config . scrollContainer  ||  janela , ' scroll ' , this . scrollHandler );
      isso . util (). removeEvent ( janela , ' redimensionar ' , this . scrollHandler );
      if ( this . interval  ! =  null ) {
        return  clearInterval ( this . interval );
      }
    };

    WOW . protótipo . sync  =  function ( element ) {
      if ( MutationObserver . notSupported ) {
        devolva  isto . doSync ( este . elemento );
      }
    };

    WOW . protótipo . doSync  =  function ( element ) {
      caixa var , j, len, ref, resultados;
      if (elemento ==  nulo ) {
        element =  this . elemento ;
      }
      if ( elemento . nodeType  ! ==  1 ) {
        retorno ;
      }
      elemento =  elemento . parentNode  || elemento;
      ref =  elemento . querySelectorAll ( " . "  +  this . config . boxClass );
      results = [];
      para (j =  0 , len =  ref . length ; j < len; j ++ ) {
        box = ref [j];
        if ( indexOf . call ( this . todos , caixa) <  0 ) {
          isso . caixas . empurre (caixa);
          isso . tudo . empurre (caixa);
          if ( this . parou  ||  this . disabled ()) {
            isso . resetStyle ();
          } mais {
            isso . applyStyle (box, true );
          }
          resultados . push ( this . rolado  =  verdadeiro );
        } mais {
          resultados . push ( void  0 );
        }
      }
      retornar resultados;
    };

    WOW . protótipo . show  =  function ( box ) {
      isso . applyStyle (box);
      caixa . className  =  box . className  +  "  "  +  isto . config . animateClass ;
      if ( this . config . retorno de chamada  ! =  null ) {
        isso . config . retorno de chamada (caixa);
      }
      isso . util (). emitEvent (box, this . wowEvent );
      isso . util (). addEvent (box, ' animationend ' , isto . resetAnimation );
      isso . util (). addEvent (box, ' oanimationend ' , this . resetAnimation );
      isso . util (). addEvent (box, ' webkitAnimationEnd ' , this . resetAnimation );
      isso . util (). addEvent (box, ' MSAnimationEnd ' , this . resetAnimation );
      caixa de devolução ;
    };

    WOW . protótipo . applyStyle  =  function ( box , hidden ) {
      var delay, duração, iteração;
      duração =  caixa . getAttribute ( ' data-wow-duration ' );
      atraso =  caixa . getAttribute ( ' data-wow-delay ' );
      iteração =  caixa . getAttribute ( ' data-wow-iteration ' );
      devolva  isto . animate (( função ( _this ) {
         função de retorno () {
          return  _this . customStyle (caixa, oculto, duração, atraso, iteração);
        };
      }) ( este ));
    };

    WOW . protótipo . animate  = ( function () {
      if ( ' requestAnimationFrame '  na  janela ) {
        retorno  de função ( de retorno ) {
           janela de retorno . requestAnimationFrame (callback);
        };
      } mais {
        retorno  de função ( de retorno ) {
          return  callback ();
        };
      }
    }) ();

    WOW . protótipo . resetStyle  =  function () {
      caixa var , j, len, ref, resultados;
      ref =  isso . caixas ;
      results = [];
      para (j =  0 , len =  ref . length ; j < len; j ++ ) {
        box = ref [j];
        resultados . push ( box . style . visibility  =  ' visible ' );
      }
      retornar resultados;
    };

    WOW . protótipo . resetAnimation  =  function ( event ) {
      var alvo;
      if ( event . tipo . toLowerCase (). indexOf ( ' animationend ' ) > =  0 ) {
        target =  event . alvo  ||  evento . srcElement ;
         meta de retorno . className  =  target . className . substitua ( this . config . animateClass , ' ' ). trim ();
      }
    };

    WOW . protótipo . customStyle  =  função ( caixa , oculto , duração , atraso , iteração ) {
      if (hidden) {
        isso . cacheAnimationName (caixa);
      }
      caixa . estilo . visibilidade  = oculto ?  ' hidden '  :  ' visível ' ;
      if (duração) {
        isso . vendorSet ( box . style , {
          animaçãoDuração : duração
        });
      }
      if (atraso) {
        isso . vendorSet ( box . style , {
          animationDelay : atraso
        });
      }
      if (iteração) {
        isso . vendorSet ( box . style , {
          animationIterationCount : iteração
        });
      }
      isso . vendorSet ( box . style , {
        animationName : oculto ?  ' none '  :  isso . cachedAnimationName (caixa)
      });
      caixa de devolução ;
    };

    WOW . protótipo . vendors  = [ " moz " , " webkit " ];

    WOW . protótipo . vendorSet  =  function ( elem , properties ) {
      nome var , resultados, valor, fornecedor;
      results = [];
      para (nome nas propriedades) {
        valor = propriedades [nome];
        elem [ " "  + nome] = valor;
        resultados . push (( function () {
          var j, len, ref, results1;
          ref =  isso . fornecedores ;
          results1 = [];
          para (j =  0 , len =  ref . length ; j < len; j ++ ) {
            fornecedor = ref [j];
            results1 . push (elem [ " "  + vendor + ( nome . charAt ( 0 ). toUpperCase ()) + ( nome . substr ( 1 ))] = valor);
          }
          retornar resultados1;
        }). chame ( isto ));
      }
      retornar resultados;
    };

    WOW . protótipo . vendorCSS  =  function ( elem , property ) {
      var j, len, ref, resultado, estilo, vendedor;
      style =  getComputedStyle (elem);
      result =  style . getPropertyCSSValue (propriedade);
      ref =  isso . fornecedores ;
      para (j =  0 , len =  ref . length ; j < len; j ++ ) {
        fornecedor = ref [j];
        resultado = resultado ||  estilo . getPropertyCSSValue ( " - "  + fornecedor +  " - "  + propriedade);
      }
      resultado de retorno ;
    };

    WOW . protótipo . animationName  =  function ( box ) {
      var animationName, erro;
      tente {
        animationName =  this . vendorCSS (caixa, ' nome da animação ' ). cssText ;
      } pegar (erro) {
        animationName =  getComputedStyle (box). getPropertyValue ( ' animation-name ' );
      }
      if (animationName ===  ' none ' ) {
        return  ' ' ;
      } mais {
        return animationName;
      }
    };

    WOW . protótipo . cacheAnimationName  =  function ( box ) {
      devolva  isto . animationNameCache . set (box, this . animationName (caixa));
    };

    WOW . protótipo . cachedAnimationName  =  function ( box ) {
      devolva  isto . animationNameCache . get (box);
    };

    WOW . protótipo . scrollHandler  =  function () {
      devolva  isto . rolado  =  verdadeiro ;
    };

    WOW . protótipo . scrollCallback  =  function () {
      caixa var ;
      if ( this . rolado ) {
        isso . rolado  =  falso ;
        isso . boxes  = ( function () {
          var j, len, ref, resultados;
          ref =  isso . caixas ;
          results = [];
          para (j =  0 , len =  ref . length ; j < len; j ++ ) {
            box = ref [j];
            if ( ! (box)) {
              continuar ;
            }
            if ( this . isVisible (box)) {
              isso . show (caixa);
              continuar ;
            }
            resultados . empurre (caixa);
          }
          retornar resultados;
        }). chamar ( isso );
        if ( ! ( this . boxes . length  ||  isto . config . live )) {
          devolva  isto . stop ();
        }
      }
    };

    WOW . protótipo . offsetTop  =  function ( element ) {
      var top;
      while ( elemento . offsetTop  ===  void  0 ) {
        elemento =  elemento . parentNode ;
      }
      topo =  elemento . offsetTop ;
      while (elemento =  elemento . offsetParent ) {
        superior + =  elemento . offsetTop ;
      }
      voltar topo;
    };

    WOW . protótipo . isVisible  =  function ( box ) {
      var bottom, offset, top, viewBottom, viewTop;
      deslocamento =  caixa . getAttribute ( ' data-wow-offset ' ) ||  isso . config . offset ;
      viewTop = ( this . config . scrollContainer  &&  this . config . scrollContainer . scrollTop ) ||  janela . pageYOffset ;
      viewBottom = viewTop +  Math . min ( esta . elemento . clientHeight , esta . util (). innerHeight ()) - compensado;
      top =  isso . offsetTop (caixa);
      bottom = top +  box . clientHeight ;
      return top <= viewBottom && bottom > = viewTop;
    };

    WOW . protótipo . util  =  function () {
      devolva  isto . _util  ! =  null  ?  isso . _util  :  isso . _util  =  new  Util ();
    };

    WOW . protótipo . disabled  =  function () {
      retorno  ! isso . config . mobile  &&  this . util (). isMobile ( navegador . userAgent );
    };

    retorno  WOW ;

  }) ();

}). chamar ( isso );