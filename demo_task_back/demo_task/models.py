from django.db import models
from django.core.validators import RegexValidator, MaxValueValidator
from django.utils.translation import gettext_lazy as _


class Worker(models.Model):
    """
    Исполнители
    """
    FIO = models.CharField(max_length=100, verbose_name='ФИО')

    class Meta:
        verbose_name = 'Исполнитель'
        verbose_name_plural = 'Исполнители'

    def __str__(self):
        return self.FIO


class PositionToRequest(models.Model):
    position = models.ForeignKey('Position', on_delete=models.CASCADE, verbose_name='Позиция')
    request = models.ForeignKey('Request', related_name='positions', on_delete=models.CASCADE, verbose_name='Запрос')
    amount = models.IntegerField(verbose_name='Ед.')

    def __str__(self):
        return f'{self.position} x{self.amount}'

    class Meta:
        verbose_name = 'Позиция в запросе'
        verbose_name_plural = 'Позиции в запросе'


class Position(models.Model):
    """
    ○ Наименование позиции
    ○ Код ОКПД2 (просто строка формата xxx.xxx.xxx.xxx);
    ○ Код ОКЕИ (число формата xxx, можно набить просто 1, 2,
    3);
    """
    name = models.CharField(max_length=100, verbose_name='Позиция', default='-')
    okpd2_code = models.CharField(max_length=15,
                                  verbose_name='Код ОКПД',
                                  validators=[RegexValidator(r'[\w]{3,3}\.[\w]{3,3}\.[\w]{3,3}\.[\w]{3,3}',
                                                             message='ххх.ххх.ххх.ххх')])
    okei_code = models.IntegerField(verbose_name='Код ОКЕИ',
                                    default=0,
                                    validators=[MaxValueValidator(limit_value=999, message='xxx')])

    class Meta:
        verbose_name = 'Позиция'
        verbose_name_plural = 'Позиции'

    def __str__(self):
        return self.name


class Status(models.TextChoices):
    """
    Возможные статусы запросов
    ○ Создан;
    ○ Принят в работу Исполнителем;
    ○ Сформирован расчет;
    ○ Возвращен исполнителю;
    ○ Исполнитель с расчета снят;
    ○ Просрочен;
    """
    CREATED = 'CREATED', _('Создан')
    ACCEPTED = 'ACCEPTED', _('Принят в работу исполнителем')
    FORMED = 'FORMED', _('Сформирован расчет')
    RETURNED = 'RETURNED', _('Возвращен исполнителю')
    REMOVED = 'REMOVED', _('Исполнитель с расчета снят')
    EXSPIRED = 'EXSPIRED', _('Просрочен')


class Request(models.Model):
    """
    Запрос - модель и запись в БД, поля:
        ● ID - инкрементируемый идентификатор;
        ● Наименование запроса, например “Запрос на расчет канцелярии”;
        ● Состав запроса для расчета:
            ○ Наименование позиции
            ○ Код ОКПД2 (просто строка формата xxx.xxx.xxx.xxx);
            ○ Код ОКЕИ (число формата xxx, можно набить просто 1, 2,
            3);
            ○ Количество единиц;
        ● Дата создания запроса;
        ● Дата крайнего срока предоставления отчета;
        ● Статус - связь с записью в истории изменений, берется
        последняя запись;
        ● Расчет - связь с записью Расчетов;
    """
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, verbose_name='Наименование запроса', default='-')
    created = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания', blank=True, null=True)
    deadline = models.DateField(verbose_name='Крайний срок отчета', blank=True, null=True)
    status = models.CharField(max_length=30, choices=Status.choices, verbose_name='Статус', default='CREATED', blank=True, null=True)
    worker = models.ForeignKey('Worker', on_delete=models.SET_NULL, blank=True, verbose_name='Исполнитель', null=True)
    resolution = models.TextField(blank=True, verbose_name='Резолюция', null=True)

    def __str__(self):
        return f'{self.id}: {self.name}'

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if not History.objects.filter(
                request_id=self,
                status=self.status,
                worker=self.worker,
                resolution=self.resolution).exists():
            History.objects.create(
                request_id=self,
                status=self.status,
                worker=self.worker,
                resolution=self.resolution
                )

    class Meta:
        verbose_name = 'Запрос'
        verbose_name_plural = 'Запросы'


class History(models.Model):
    """
    История изменений - модель, в которую идут записи обо всех шагах с запросом:
    Запись в истории изменений запроса - модель:
        ● ID запроса,
        ● Дата создания записи;
        ● Статус изменения -
            ○ Создан;
            ○ Принят в работу Исполнителем;
            ○ Сформирован расчет;
            ○ Возвращен исполнителю;
            ○ Исполнитель с расчета снят;
            ○ Просрочен;
        ● Исполнитель - связь с записью Исполнителя, который может быть
        соотнесен с этой записью (например, если назначен);
        ● Резолюция - текстовое поле;
    """
    request_id = models.ForeignKey('Request', on_delete=models.SET_NULL, verbose_name='Id запроса', null=True)
    created = models.DateTimeField(auto_now_add=True, verbose_name='Дата изменения')
    status = models.CharField(max_length=30, choices=Status.choices, verbose_name='Статус', default='CREATED')
    worker = models.ForeignKey('Worker', on_delete=models.SET_NULL, blank=True, verbose_name='Исполнитель', null=True)
    resolution = models.TextField(blank=True, verbose_name='Резолюция', null=True)

    class Meta:
        verbose_name = 'История запросов'
        verbose_name_plural = 'История запросов'


class Payment(models.Model):
    """
        Расчет - модель в которую записываются записи о сформированных расчетах к
        запросу (у каждого запроса может быть от 1 до N расчетов) -

        ● ID расчета;
        ● ID запроса - связь с запросом;
        ● Исполнитель - связь с исполнителем;
        ○ Состав расчета - НМЦ (цена) за каждую позицию в
        запросе;
        ● Дата создания расчета;
    """
    id = models.AutoField(primary_key=True)
    request = models.ForeignKey('Request', related_name='payments', on_delete=models.CASCADE, null=True)
    position = models.ForeignKey('PositionToRequest', on_delete=models.CASCADE, verbose_name='Позиция', null=True)
    price = models.IntegerField(verbose_name='Цена')
    worker = models.ForeignKey('Worker', on_delete=models.SET_NULL, null=True, verbose_name='Исполнитель')
    created = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания расчета')
