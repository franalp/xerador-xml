<?php
    header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
    header("Expires: Sat, 1 Jul 2020 05:00:00 GMT"); // Fecha en el pasado
?>
<!DOCTYPE html>
<html lang=ca>

<head>
    <title>Creador de preguntes XML per a Moodle - Català</title>
    <meta charset=utf-8>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv='cache-control' content='no-cache, mustrevalidate'>
    <meta http-equiv='expires' content='0'>
    <meta http-equiv='pragma' content='no-cache'>
    <link rel=stylesheet href=../css/bootstrap.css />
    <link rel=stylesheet href=../css/style_v_0_2.css?ver=2 />
    <script src=js/lang_cat.js></script>
    <script src=../js/vue.js></script>
    <script src=../js/he.js?ver=1></script>

</head>

<body>
    <nav>
        <img src=../img/language.svg width=18 hspace=10>
        <select name="idioma" onchange="location = this.value;" class=form-group-idioma data-width=150px>
            <option value="../gal/" data-content='<span class="flag-icon galicia"></span> Galego'>Galego</option>
            <option value="../es/" data-content='<span class="flag-icon flag-icon-es"></span> Castellano'>Castellano</option>
            <!-- <option value="../eus/" data-content='<span class="flag-icon basque"></span> Euskara'>Euskara</option> -->
            <option value="#" data-content='<span class="flag-icon catalonia"></span> Catalá' selected>Catalá</option>
            <option value="../pt/" data-content='<span class="flag-icon flag-icon-pt"></span> Portugues'>Portugues</option>
            <option value="../en/" data-content='<span class="flag-icon uk"></span> English'>English</option>
            <option value="../fr/" data-content='<span class="flag-icon fr"></span> Français'>Français</option>
            <option value="../de/" data-content='<span class="flag-icon de"></span> Deutsche'>Deutsche</option>
            <option value="../it/" data-content='<span class="flag-icon de"></span> Italiano'>Italiano</option>
        </select>
    </nav>

    <div id=app class=container>

        <h1>
            <hr style="border-color:grey;">
            <script>
                document.write(capalang[1])

            </script>
            <button type=button class="btn btn-primary pull-right" @click=build>
                <script>
                    document.write(capalang[3])

                </script>
            </button>
        </h1>
        <small>
            <script>
                document.write(capalang[2])

            </script>
        </small>
        <p>
        <ol>
            <li v-for="(question, i) in questions">
                <form class=form-horizontal>
                    <div class=form-group>
                        <label :for="'question_'+i+'_type'" class="control-label col-sm-2 col-md-1">
                            <script>
                                document.write(capalang[5])

                            </script>
                        </label>
                        <div class="col-sm-6 col-md-4">
                            <select :id="'question_'+i+'_type'" class=form-control v-model=question.type>
                                <option v-for="opt in questionTypes" :value=opt.type>{{ opt.text }}</option>
                            </select>
                        </div>
                        <a class="btn btn-default btn-circle pull-right glyphicon glyphicon-remove" @click=question.remove></a>
                    </div>
                    <div class=form-group>
                        <label :for="'question_'+i+'_title'" class="control-label col-sm-2 col-md-1">
                            <script>
                                document.write(capalang[6])

                            </script>
                        </label>
                        <div class="col-sm-10">
                            <input type=text :id="'question_'+i+'_title'" class=form-control v-model=question.title>
                        </div>
                    </div>
                    <div class=form-group>
                        <label :for="'question_'+i+'_text'" class="control-label col-sm-2 col-md-1">
                            <script>
                                document.write(capalang[7])

                            </script>
                        </label>
                        <div class="col-sm-10">
                            <textarea :id="'question_'+i+'_text'" class=form-control rows=5 v-model=question.text></textarea>
                        </div>
                    </div>
                    <div class=form-group v-if=question.showOptions>
                        <label class="control-label col-sm-2 col-md-1">
                            <script>
                                document.write(capalang[8])

                            </script>
                        </label>
                        <button type=button class="btn btn-default" @click=question.addOption>
                            <script>
                                document.write(capalang[9])

                            </script>
                        </button>
                    </div>
                    <div class=form-group v-if=question.showOptionsShort>
                        <label class="control-label col-sm-2 col-md-1">
                            <script>
                                document.write(capalang[13])

                            </script>
                        </label>
                        <button type=button class="btn btn-default" @click=question.addOption>
                            <script>
                                document.write(capalang[9])

                            </script>
                        </button>
                    </div>
                    <div class=form-group v-if=question.showOptionsMatch>
                        <label class="control-label col-sm-2 col-md-1">
                            <script>
                                document.write(capalang[15])

                            </script>
                        </label>
                        <button type=button class="btn btn-default" @click=question.addOption>
                            <script>
                                document.write(capalang[16])

                            </script>
                        </button>
                    </div>
                    <div class=form-group v-if=question.showOptionsOrder>
                        <label class="control-label col-sm-2 col-md-1">
                            <script>
                                document.write(capalang[19])

                            </script>
                        </label>
                        <button type=button class="btn btn-default" @click=question.addOption>
                            <script>
                                document.write(capalang[20])

                            </script>
                        </button>
                    </div>
                </form>
                <div v-if=question.showOptions class="form-inline col-sm-offset-1">
                    <script>
                        document.write(capalang[10])

                    </script>
                    <ol>
                        <li v-for="(opt, j) in question.options">
                            <div class="form-group option-value" :class="{'has-error':!opt.valid}">
                                <label :for="'question_'+i+'_option_'+j+'_value'" class=control-label>
                                    <script>
                                        document.write(capalang[11])

                                    </script>
                                </label>
                                <input type=text :id="'question_'+i+'_option_'+j+'_value'" class=form-control v-model.number=opt.value>
                            </div>
                            <div class="form-group option-text">
                                <label :for="'question_'+i+'_option_'+j+'_text'" class=control-label>
                                    <script>
                                        document.write(capalang[12])

                                    </script>
                                </label>
                                <input type=text :id="'question_'+i+'_option_'+j+'_text'" class=form-control v-model=opt.text>
                            </div>
                            <a class="btn btn-default btn-circle pull-right small glyphicon glyphicon-remove" @click=opt.remove></a>
                        </li>
                    </ol>
                </div>
                <div v-if=question.showOptionsShort class="form-inline col-sm-offset-1">
                    <script>
                        document.write(capalang[14])

                    </script>
                    <ol>
                        <li v-for="(opt, j) in question.options">
                            <div class="form-group option-text">
                                <label :for="'question_'+i+'_option_'+j+'_text'" class=control-label>
                                    <script>
                                        document.write(capalang[12])

                                    </script>
                                </label>
                                <input type=text :id="'question_'+i+'_option_'+j+'_text'" class=form-control v-model=opt.text>
                            </div>
                            <a class="btn btn-default btn-circle pull-right small glyphicon glyphicon-remove" @click=opt.remove></a>
                        </li>
                    </ol>
                </div>
                <div v-if=question.showOptionsOrder class="form-inline col-sm-offset-1">
                    <script>
                        document.write(capalang[21])

                    </script>.
                    <ol>
                        <li v-for="(opt, j) in question.options">
                            <div class="form-group option-value" :class="{'has-error':!opt.valid}">
                                <label :for="'question_'+i+'_option_'+j+'_value'" class=control-label>
                                    <script>
                                        document.write(capalang[22])

                                    </script>
                                </label>
                                <input type=text :id="'question_'+i+'_option_'+j+'_value'" class=form-control v-model.number=opt.pos>
                            </div>
                            <div class="form-group option-text">
                                <label :for="'question_'+i+'_option_'+j+'_text'" class=control-label>
                                    <script>
                                        document.write(capalang[12])

                                    </script>
                                </label>
                                <input type=text :id="'question_'+i+'_option_'+j+'_text'" class=form-control v-model=opt.text>
                            </div>
                            <a class="btn btn-default btn-circle pull-right small glyphicon glyphicon-remove" @click=opt.remove></a>
                        </li>
                    </ol>
                </div>
                <div v-if=question.showOptionsMatch class="form-inline col-sm-offset-1">
                    <script>
                        document.write(capalang[17])

                    </script>
                    <ol>
                        <li v-for="(opt, j) in question.options">
                            <div class="form-group option-text2">
                                <label :for="'question_'+i+'_option_'+j+'_text'" class=control-label>
                                    <script>
                                        document.write(capalang[18])

                                    </script>
                                </label>
                                <input type=text :id="'question_'+i+'_option_'+j+'_text'" class=form-control v-model=opt.text>
                                <label :for="'question_'+i+'_option_'+j+'_text2'" class=control-label> -- </label>
                                <input type=text :id="'question_'+i+'_option_'+j+'_text2'" class=form-control v-model=opt.text2>
                            </div>
                            <a class="btn btn-default btn-circle pull-right small glyphicon glyphicon-remove" @click=opt.remove></a>
                        </li>
                    </ol>
                </div>
                <div v-if=question.showInstructions class="form-inline col-sm-offset-1">
                    <ol>
                        <li v-for="(opt, j) in question.options">
                            <div class="form-group option-text">
                                <input type=text class=form-control v-model=opt.text>
                            </div>
                        </li>
                    </ol>
                </div>
            </li>
        </ol>
        </p>
        <button type=button class="btn btn-primary" @click=addQuestion>
            <script>
                document.write(capalang[4])

            </script>
        </button>
        <p><br><br><br>
            <center><small><a href='https://youtu.be/7f3lV9bp2Lk'>
Instruccions per a importar l'arxiu en Moodle.</a>.
                    <br>Baseado en "moodle-quiz-builder" de Marco Bolis.
                    <br>Traducido e modificado por <b>Francisco Alonso</b>.
                    <br><a href="http://www.edu.xunta.gal/centros/ceipabanqueiro/">CEIP Plurilingüe de Abanqueiro</a>
                    <br><b>ver.1.4</b> - 28/11/2020</small><br>&nbsp;<br><img src="https://i.creativecommons.org/l/by-nc/3.0/88x31.png" alt="by-nc" border="0"></center>
        </p>
    </div>
    <script src=../js/appxml.js?ver=1.4></script>
</body>

</html>
<?php
?>
